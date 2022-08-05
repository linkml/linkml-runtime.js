import { Namespace, RDFaProcessor } from "rdflib"
import { NamedNode } from "rdflib/lib/tf-types"
import fetch from 'cross-fetch'


const BIOCONTEXT_CACHE = new Map()

async function readBiocontext(name: string) {
  if (BIOCONTEXT_CACHE.has(name)) {
    return BIOCONTEXT_CACHE.get(name)
  }
  const response = await fetch(`https://raw.githubusercontent.com/prefixcommons/biocontext/master/registry/${name}.jsonld`)
  if (!response.ok) {
    throw new Error('Cannot fetch context for:' + name)
  }
  const body = await response.json()
  const context = body['@context'] || body
  BIOCONTEXT_CACHE.set(name, context)
  return context
}

function isNcname(key: string) {
  if (!key) {
    return false
  }
  return RDFaProcessor.NCNAME.test(key)
}


export default class Namespaces {
  #default_key = '@default'
  #base_key = '@base'
  #store: Map<string, (s: string) => NamedNode>

  constructor() {
    this.#store = new Map()
  }

  get _default() {
    return this.#store.get(this.#default_key)
  }

  set _default(item: any) {
    const v = Namespace(item.toString())
    if (this._default !== undefined && this._default !== v) {
      throw new Error(`Default is already set to ${this._default}`)
    }
    this.#store.set(this.#default_key, v)
  }

  get _base() {
    return this.#store.get(this.#base_key)
  }

  set _base(item: any) {
    const v = Namespace(item.toString())
    if (this._base !== undefined && this._base !== v) {
      throw new Error(`Base is already set to ${this._base}`)
    }
    this.#store.set(this.#base_key, v)
  }

  clearDefault() {
    this.#store.delete(this.#default_key)
  }

  clearBase() {
    this.#store.delete(this.#base_key)
  }

  set(key, value) {
    if (!isNcname(key)) {
      throw new Error('Invalid NCName: ' + key)
    }
    const v = Namespace(value.toString())
    if (this.#store.has(key) && this.#store.get(key) !== v) {
      console.warn(`${key} namespace is already mapped to ${this.#store.get(key)} - Mapping to ${v} ignored`)
    } else {
      this.#store.set(key, v)
    }
  }

  get(key) {
    if (!this.#store.has(key)) {
      throw new Error('Key does not exist: ' + key)
    }
    return this.#store.get(key)
  }

  async addPrefixmap(mapName: string, includeDefaults: boolean = true): Promise<void> {
    const bioContext = await readBiocontext(mapName)
    for (const [key, value] of Object.entries(bioContext)) {
      if (!key) {
        if (includeDefaults && !this._default) {
          this._default = value
        }
      } else if (!this.#store.has(key)) {
        if (isNcname(key)) {
          this.set(key, value)
        }
      }
    }
  }

  curieFor(uri: string, defaultOk: boolean = true): string {
    if (uri.includes(':') && !uri.includes(':/')) {
      throw new Error('Not a valid URI: ' + uri)
    }

    let matchString = ''
    let matchPrefix
    for (const [key, ns] of this.#store) {
      const nsString = ns('').value
      if (uri.startsWith(nsString)) {
        if (nsString.length > matchString.length) {
          if (defaultOk || (key !== this.#default_key && key !== this.#base_key)) {
            matchString = nsString
            matchPrefix = key
          }
        }
      }
    }
    if (matchString) {
      let replacement
      if (matchPrefix === this.#default_key) {
        replacement = ":"
      } else if (matchPrefix === this.#base_key) {
        replacement = ""
      } else {
        replacement = matchPrefix + ":"
      }
      return uri.replace(matchString, replacement)
    }
    return undefined
  }

  uriFor(uri_or_curie: string): string {
    if (uri_or_curie.includes('://')) {
      return uri_or_curie
    }
    let prefix
    let local
    if (uri_or_curie.includes(':')) {
      [prefix, local] = uri_or_curie.split(/:(.*)/).slice(0, 2)
      if (!prefix) {
        prefix = this.#default_key
      } else if (!isNcname(prefix)) {
        throw new Error('Not a valid CURIE: ' + uri_or_curie)
      }
    } else {
      prefix = this.#base_key
      local = uri_or_curie
    }

    console.log(this.#store)
    if (!this.#store.has(prefix)) {
      throw new Error('Unknown CURIE prefix: ' + prefix)
    }
    return this.#store.get(prefix)(local).value
  }
}
