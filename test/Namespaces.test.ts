import Namespaces from '../src/Namespaces'

describe('Namespaces', () => {
  it('test', async () => {
    const ns = new Namespaces()
    ns.set('meta', 'https://w3id.org/biolink/metamodel/')
    expect(ns.get('meta')('').value).toEqual('https://w3id.org/biolink/metamodel/')

    ns.set('OIO', 'http://www.geneontology.org/formats/oboInOwl')
    ns.set('dc', "http://example.org/dc/")
    ns.set('l1', "http://example.org/subset/")
    ns.set('l2', "http://example.org/subset/test/")
    ns.set('l3', "http://example.org/subset/t")

    expect(() => {
      ns.set("123", "http://example.org/foo/")
    }).toThrow('Invalid NCName')

    expect(() => {
      ns.get('FOO')
    }).toThrow('FOO')

    ns._default = ns.get('meta')
    expect(() => {
      ns._default = "http://example.org/wrong/"
    }).toThrow('Default is already set')

    ns.clearDefault()
    expect(ns._default).toBeUndefined()
    ns._default = ns.get('meta')

    ns._base = "http://example.org/base/"
    expect(() => {
      ns._base = "http://example.org/wrong/"
    }).toThrow('Base is already set')
    ns.clearBase()
    expect(ns._base).toBeUndefined()
    ns._base = "http://example.org/wrong/"

    ns.clearDefault()
    await ns.addPrefixmap('semweb_context')
    await ns.addPrefixmap('monarch_context')
    expect(ns._default('').value).toEqual('https://monarchinitiative.org/')

    ns.clearDefault()
    ns._default = ns.get('meta')('').value
    expect(ns.curieFor('http://example.org/subset/foo')).toEqual('l1:foo')
    expect(ns.curieFor('http://example.org/subset/test/foo')).toEqual('l2:foo')
    expect(ns.curieFor('http://example.org/subset/table/foo')).toEqual('l3:able/foo')

    expect(ns.uriFor('dc:table')).toEqual('http://example.org/dc/table')
    expect(ns.uriFor('http://something.org')).toEqual('http://something.org')
    expect(ns.uriFor(':Schema')).toEqual('https://w3id.org/biolink/metamodel/Schema')
    expect(ns.uriFor('Base')).toEqual('http://example.org/wrong/Base')

    ns.clearBase()
    expect(() => {
      ns.uriFor('Base')
    }).toThrow('Unknown CURIE prefix: @base')

    expect(ns.curieFor("http://google.com/test")).toBeUndefined()
    expect(() => {
      ns.uriFor("1abc:junk")
    }).toThrow('Not a valid CURIE')
  })
})
