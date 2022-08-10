import { readFile } from 'fs/promises'
import { parse } from 'yaml'
import {
    SchemaDefinition, Definition, ClassDefinition, SlotDefinition, ClassDefinitionName, SlotDefinitionName,
    EnumDefinition, TypeDefinition, EnumDefinitionName, TypeDefinitionName, Element, SchemaDefinitionName, ElementName
}
    from "./MetaModel";
import Namespaces from './Namespaces';
import path from 'path'
import fetch from 'cross-fetch'
import { klona } from 'klona'

export type Name = ClassDefinitionName | SlotDefinitionName

export type OrderedBy = "rank" | "lexical" | "preserve"

function isDefinition(x: Element | Name ): x is Element {
    return x!= undefined && (<Element>x).name !== undefined;
}

function orderLexically(elements: Map<ElementName, Element>): Map<ElementName, Element> {
    const orderedElements: Map<ElementName, Element> = new Map()
    const orderedElementNames = [...elements.keys()].sort()
    for (const name of orderedElementNames) {
        orderedElements.set(name, elements.get(name))
    }
    return orderedElements
}

function orderRank(elements: Map<ElementName, Element>): Map<ElementName, Element> {
    const rankedElements: Map<Number, Element> = new Map()
    const unrankedElements: Map<ElementName, Element> = new Map()
    for (const [name, element] of elements) {
        if (element.rank !== undefined) {
            rankedElements.set(element.rank, element)
        } else {
            unrankedElements.set(name, element)
        }
    }
    const orderedRanks = [...rankedElements.keys()].sort()
    const orderedElements: Map<ElementName, Element> = new Map()
    for (const rank of orderedRanks) {
        const element = rankedElements.get(rank)
        orderedElements.set(element.name, element)
    }
    for (const [name, element] of unrankedElements) {
        orderedElements.set(name, element)
    }
    return orderedElements
}

function _closure<T>(f: (x: T) => T[], x: T, reflexive=true): T[] {
    let rv = []
    if (reflexive) {
        rv = [x]
    }
    let visited = []
    let todo = [x]
    while (todo.length > 0) {
        let i = todo.pop()
        visited.push(i)
        let vals = f(i)
        for (let v of vals) {
            if (!visited.includes(v)) {
                todo.push(v)
                rv.push(v)
            }
        }
    }
    return rv
}

function _not_false(v) {
    return v == undefined || v == true
}

async function loadSchema(file: string, baseDir: string | null = null): Promise<SchemaDefinition> {
    const isRemote = /^https?:\/\//.test(file)
    let content
    if (isRemote) {
        const response = await fetch(file)
        if (!response.ok) {
            throw new Error('Could not fetch: ' + file)
        }
        content = await response.text()
    } else {
        if (baseDir) {
            file = path.join(baseDir, file)
        }
        content = await readFile(file, 'utf-8')
    }
    const schema: SchemaDefinition = parse(content)
    schema.source_file = file
    setNameFromKey(schema, SUBSETS)
    setNameFromKey(schema, TYPES)
    setNameFromKey(schema, ENUMS)
    setNameFromKey(schema, SLOTS)
    setNameFromKey(schema, CLASSES)
    if (schema.classes) {
        Object.values(schema.classes).forEach(cls => setNameFromKey(cls, 'attributes'))
    }
    return schema
}

function setNameFromKey(schema: SchemaDefinition | ClassDefinition, slotName: SlotDefinitionName): void {
    if (!schema) {
        return
    }
    const elements: {[key: ElementName]: Element} = schema[slotName]
    if (elements) {
        for (const [key, element] of Object.entries(elements)) {
            if (element) {
                if (!element.name) {
                    element.name = key
                }
            } else {
                elements[key] = { name: key }
            }
        }
    }
}

interface TraversalSpecificOptions {
    mixins?: boolean,
    is_a?: boolean,
    reflexive?: boolean
}

interface ImportOptions {
    imports?: boolean,
}

interface WalkerOptions {
    mutate?: boolean,
}

export type TraversalOptions = TraversalSpecificOptions & ImportOptions

const SLOTS = 'slots'
const CLASSES = 'classes'
const ENUMS = 'enums'
const SUBSETS = 'subsets'
const TYPES = 'types'

/**
 * operations over schemas
 */
export class SchemaView {
    schema: SchemaDefinition
    virtual_schema: SchemaDefinition
    schemaMap: Map<SchemaDefinitionName, SchemaDefinition>
    _namespaces: Namespaces
    _importsLoaded: boolean
    modifications: number

    static async load(file: string, loadImportsClosure: boolean = false) {
        const schema = await loadSchema(file)
        const view = new SchemaView(schema)
        if (loadImportsClosure) {
            await view.loadImportsClosure()
        }
        return view
    }

    constructor(schema: SchemaDefinition) {
        this.schema = schema
        this.schemaMap = new Map([[this.schema.name, this.schema]])
        this.modifications = 0
        this._importsLoaded = false

        setNameFromKey(this.schema, SUBSETS)
        setNameFromKey(this.schema, TYPES)
        setNameFromKey(this.schema, ENUMS)
        setNameFromKey(this.schema, SLOTS)
        setNameFromKey(this.schema, CLASSES)
        if (this.schema.classes) {
            Object.values(this.schema.classes).forEach(cls => setNameFromKey(cls, 'attributes'))
        }

        this._index()
    }

    _index(): void {
        // TODO: merge imports
        this.virtual_schema = this.schema
    }

    /**
     * retrieve a ClassDefinition by its name
     *
     * @param name - class or class name
     */
    get_class(name: ClassDefinitionName | ClassDefinition): ClassDefinition {
        if (isDefinition(name)) {
            return name
        }
        else {
            return this.virtual_schema.classes[name]
        }
    }

    /**
     * retrieve a EnumDefinition by its name
     *
     * @param name - enum or enum name
     */
    get_enum(name: EnumDefinitionName | EnumDefinition): EnumDefinition {
        if (isDefinition(name)) {
            return name
        }
        else {
            return this.virtual_schema.enums[name]
        }
    }

    /**
     * retrieve a TypeDefinition by its name
     *
     * @param name - Type or Type name
     */
    get_type(name: TypeDefinitionName | TypeDefinition, imports: boolean = true): TypeDefinition {
        if (isDefinition(name)) {
            return name
        }
        return this.allTypes(imports).get(name)
    }

    /**
     * retrieve a SlotDefinition by its name
     *
     * @param name - class or class name
     */
    get_slot(name: SlotDefinitionName | SlotDefinition): SlotDefinition {
        if (isDefinition(name)) {
            return name
        }
        else {
            if (this.virtual_schema.slots != undefined && name in this.virtual_schema.slots) {
                return this.virtual_schema.slots[name]
            }
            else {
                for (const [cn, c] of Object.entries(this.virtual_schema.classes)) {
                    if (c.attributes != undefined) {
                        for (const [k, attr] of Object.entries(c.attributes)) {
                            if (k == name) {
                                return attr
                            }
                        }
                    }
                }
                throw 'No such slot: ' + name
            }
        }
    }

    /**
     * All direct parents
     *
     * @param elt
     * @param opts
     */
    parents(elt: ClassDefinition | SlotDefinition, opts: TraversalOptions): Name[] {
        let parents = []
        if (_not_false(opts.is_a) && elt && elt.is_a != undefined) {
            parents = [elt.is_a]
        }
        if (_not_false(opts.mixins) && elt && elt.mixins != undefined) {
            parents = parents.concat(elt.mixins)
        }
        return parents
    }

    /**
     * Finds all ancestors for a class or slot
     *
     * @param elt
     * @param opts
     */
    ancestors(elt: ClassDefinition | SlotDefinition, opts: TraversalOptions): ClassDefinitionName[] {
        let t = this
        let f = function (x) {
            return t.parents(x, opts)
        }
        return _closure(f, elt)
    }

    /**
     * All direct parents
     *
     * @param elt
     * @param opts
     */
    class_parents(elt: ClassDefinitionName | ClassDefinition, opts: TraversalOptions): ClassDefinitionName[] {
        let c = this.get_class(elt)
        return this.parents(c, opts)
    }

    /**
     * All direct parents
     *
     * @param elt
     * @param opts
     */
    slot_parents(elt: SlotDefinitionName | SlotDefinition, opts: TraversalOptions = {}): SlotDefinitionName[] {
        let s = this.get_slot(elt)
        if (s == undefined) {
            throw 'No such slot: ' + elt
        }
        return this.parents(s, opts)
    }

    /**
     * Finds all ancestors for a class
     *
     * @param elt
     * @param opts
     */
    class_ancestors(elt: ClassDefinitionName | ClassDefinition, opts: TraversalOptions = {}): ClassDefinitionName[] {
        let t = this
        let f = function (x) {
            return t.class_parents(x, opts)
        }
        return _closure(f, elt)
    }

    /**
     * Finds all ancestors for a slot
     *
     * @param elt
     * @param opts
     */
    slot_ancestors(elt: SlotDefinitionName | SlotDefinition, opts: TraversalOptions = {}): SlotDefinitionName[] {
        let t = this
        let f = function (x) {
            return t.slot_parents(x, opts)
        }
        return _closure(f, elt)
    }

    typeParents(typeName: TypeDefinitionName | TypeDefinition, imports: boolean = true): TypeDefinitionName[] {
        const typ = this.get_type(typeName, imports)
        if (typ.typeof) {
            return [typ.typeof]
        } else {
            return []
        }
    }

    typeAncestors(typeName: TypeDefinitionName, opts: TraversalOptions = {}): TypeDefinitionName[] {
        return _closure((t) => this.typeParents(t, opts.imports), typeName)
    }

    merge_slot(base_slot: SlotDefinition, to_merge: SlotDefinition, isReflexive = false): SlotDefinition {
        if (to_merge == undefined) {
            return base_slot
        }
        for (const [k, v] of Object.entries(to_merge)) {
            if (!(k in base_slot) || base_slot[k] == undefined) {
                // base slot has priority
                base_slot[k] = v
            }
        }
        return base_slot
    }

    /**
     * Inferred slot for a slot/class combo
     *
     * @param slot_name
     * @param class_name
     * @param opts
     */
    induced_slot(slot_name: SlotDefinitionName, class_name: ClassDefinitionName | ClassDefinition,
                 opts: TraversalOptions = {}): SlotDefinition {
        if (class_name == undefined) {
            //throw 'Undefined class for slot:' + slot_name
        }
        if (slot_name == undefined) {
            throw 'No such slot ' + slot_name
        }
        const cls_ancs = this.class_ancestors(class_name)
        const slot_ancs = this.slot_ancestors(slot_name)
        let islot = {}
        this.merge_slot(islot, this.get_slot(slot_name))
        for (let cls_anc of cls_ancs) {
            let isReflexive = cls_anc == class_name
            let cls_anc_obj = this.get_class(cls_anc)
            if (cls_anc_obj == undefined) {
                throw 'No such ancestor ' + cls_anc + ' of ' + class_name
            }
            if (cls_anc_obj.attributes != undefined) {
                if (slot_name in cls_anc_obj.attributes) {
                    this.merge_slot(islot, cls_anc_obj.attributes[slot_name])
                }
            }
            if (cls_anc_obj.slot_usage != undefined) {
                if (slot_name in cls_anc_obj.slot_usage) {
                    this.merge_slot(islot, cls_anc_obj.slot_usage[slot_name], isReflexive)
                }
            }
        }
        for (let slot_anc of slot_ancs) {
            this.merge_slot(islot, this.get_slot(slot_anc))
        }
        return islot
    }

    inducedType(typeName: TypeDefinitionName): TypeDefinition {
        const typ = klona(this.get_type(typeName))
        if (typ.typeof) {
            const parent = this.inducedType(typ.typeof)
            if (!typ.uri) {
                typ.uri = parent.uri
            }
            if (!typ.base) {
                typ.base = parent.base
            }
            if (!typ.repr) {
                typ.repr = parent.repr
            }
        }
        return typ
    }

    /**
     * Get the range object for a slot
     *
     * @param slot
     */
    slotRange(slot: SlotDefinition): ClassDefinition | EnumDefinition | TypeDefinition {
        let r = slot.range
        if (this.schema.classes && r in this.schema.classes) {
            return this.get_class(r)
        }
        else if (this.schema.enums && r in this.schema.enums) {
            return this.get_class(r)
        }
        else if (this.schema.types && r in this.schema.types) {
            return this.get_type(r)
        }
        else {
            //throw 'Unknown range: ' + r + ' for slot: '+slot.name
        }
    }

    namespaces() {
        if (this._namespaces) {
            return this._namespaces
        }
        this._namespaces = new Namespaces()
        for (const schema of this.schemaMap.values()) {
            for (const [prefix, reference] of Object.entries(schema.prefixes)) {
                this._namespaces.set(prefix, reference)
            }
        }
        for (const cmap of this.schema.default_curi_maps) {
            this._namespaces.addPrefixmap(cmap, false)
        }
        return this._namespaces
    }

    async loadImport(imp: string, fromSchema: SchemaDefinition = null): Promise<SchemaDefinition> {
        if (!fromSchema) {
            fromSchema = this.schema
        }
        let sname = imp
        if (sname.includes(':')) {
            sname = this.namespaces().uriFor(imp)
        }
        let fileName = sname + '.yaml'
        let baseDir
        if (fromSchema.source_file) {
            baseDir = path.dirname(fromSchema.source_file)
        }
        return loadSchema(fileName, baseDir)
    }

    async loadImportsClosure(): Promise<void> {
        if (this._importsLoaded) {
            return
        }
        if (!this.schemaMap) {
            this.schemaMap = new Map([[this.schema.name, this.schema]])
        }
        const visited = new Set()
        const todo = [this.schema.name]
        while (todo.length > 0) {
            const schemaName = todo.pop()
            visited.add(schemaName)
            if (!this.schemaMap.has(schemaName)) {
                const importedSchema = await this.loadImport(schemaName)
                this.schemaMap.set(schemaName, importedSchema)
            }
            const schema = this.schemaMap.get(schemaName)
            if (schema.imports) {
                for (const i of schema.imports) {
                    if (!visited.has(i)) {
                        todo.push(i)
                    }
                }
            }
        }
        for (const schema of this.schemaMap.values()) {
            for (const key of [CLASSES, ENUMS, SLOTS, SUBSETS, TYPES]) {
                if (schema[key]) {
                    let element: Element
                    for (element of Object.values(schema[key])) {
                        if (element) {
                            element.from_schema = schema.id
                        }
                    }
                }
            }
            if (schema.classes) {
                for (const cls of Object.values(schema.classes)) {
                    if (cls && cls.attributes) {
                        for (const attr of Object.values(cls.attributes)) {
                            if (attr) {
                                attr.from_schema = schema.id
                            }
                        }
                    }
                }
            }
        }
        this._importsLoaded = true
    }

    importsClosure(traverse: boolean = true): SchemaDefinitionName[] {
        if (!traverse) {
            return [this.schema.name]
        }
        if (!this._importsLoaded) {
            console.warn('importsClosure called with traverse = true, but loadImportsClosure has not been called')
        }
        return [...this.schemaMap.keys()]
    }

    inSchema(elementName: ElementName): SchemaDefinitionName {
        const map = this.elementBySchemaMap()
        return map.get(elementName)
    }

    elementBySchemaMap(imports: boolean = true): Map<ElementName, SchemaDefinitionName> {
        const map = new Map()
        const schemas = this.allSchema(imports)
        for (const schema of schemas) {
            for (const typeKey of [CLASSES, SLOTS, TYPES, ENUMS, SUBSETS]) {
                if (schema[typeKey]) {
                    for (const key of Object.keys(schema[typeKey])) {
                        map.set(key, schema.name)
                    }
                }
            }
            if (schema.classes) {
                for (const cls of Object.values(schema.classes)) {
                    if (cls && cls.attributes) {
                        for (const key of Object.keys(cls.attributes)) {
                            map.set(key, schema.name)
                        }
                    }
                }
            }
        }
        return map
    }

    _getElements(slotName: string, imports: boolean = true): Map<ElementName, Element> {
        const schemas = this.allSchema(imports)
        const elements: Map<ElementName, Element> = new Map()
        for (const schema of schemas) {
            if (schema[slotName]) {
                for (const [name, cls] of Object.entries(schema[slotName])) {
                    elements.set(name, cls)
                }
            }
        }
        return elements
    }

    allSchema(imports: boolean = true): SchemaDefinition[] {
        const schemaNames = this.importsClosure(imports)
        return schemaNames.map(name => this.schemaMap.get(name))
    }

    allClasses(orderedBy: OrderedBy = "preserve", imports: boolean = true): Map<ClassDefinitionName, ClassDefinition> {
        const classes = this._getElements(CLASSES, imports)
        
        let orderedClasses
        if (orderedBy === 'lexical') {
            orderedClasses = orderLexically(classes)
        } else if (orderedBy === 'rank') {
            orderedClasses = orderRank(classes)
        } else {
            orderedClasses = classes
        }
        return orderedClasses
    }

    allTypes(imports: boolean = true): Map<TypeDefinitionName, TypeDefinition> {
        return this._getElements(TYPES, imports)
    }

    allEnums(imports: boolean = true): Map<EnumDefinitionName, EnumDefinition> {
        return this._getElements(ENUMS, imports)
    }

    allSlots(imports: boolean = true, attributes: boolean = true, orderedBy: OrderedBy = 'preserve'): Map<SlotDefinitionName, SlotDefinition> {
        const slots = klona(this._getElements(SLOTS, imports))
        if (attributes) {
            for (const cls of this.allClasses().values()) {
                if (cls && cls.attributes) {
                    for (const [attrName, attr] of Object.entries(cls.attributes)) {
                        if (!slots.has(attrName)) {
                            slots.set(attrName, attr)
                        }
                    }
                }
            }
        }

        let orderedSlots: Map<SlotDefinitionName, SlotDefinition>
        if (orderedBy === 'lexical') {
            orderedSlots = orderLexically(slots)
        } else if (orderedBy === 'rank') {
            orderedSlots = orderRank(slots)
        } else {
            orderedSlots = slots
        }
        return orderedSlots
    }

    async mergeImports() {
        await this.loadImportsClosure()
        const toMerge = this.allSchema(true).filter(s => s !== this.schema)
        for (const other of toMerge) {
            this.mergeSchema(other)
        }
        this.schema.imports = null
        this.setModified()
    }

    mergeSchema(schema: SchemaDefinition): void {
        if (schema.prefixes) {
            this.schema.prefixes = {
                ...schema.prefixes,
                ...this.schema.prefixes
            }
        }
        if (schema.classes) {
            this.schema.classes = {
                ...schema.classes,
                ...this.schema.classes
            }
        }
        if (schema.slots) {
            this.schema.slots = {
                ...schema.slots,
                ...this.schema.slots
            }
        }
        if (schema.types) {
            this.schema.types = {
                ...schema.types,
                ...this.schema.types
            }
        }
        if (schema.enums) {
            this.schema.enums = {
                ...schema.enums,
                ...this.schema.enums
            }
        }
        this.setModified()
    }

    setModified(): void {
        this.modifications += 1
    }

    // DEPRECATED
    walk(obj: any, func: Function,
         cls: ClassDefinition | SlotDefinition | EnumDefinition = null,
         isCollection = false,
         opts: WalkerOptions = {mutate: false}): any {
        if (obj instanceof Array) {
            if (isCollection) {
                return obj.map(x => this.walk(x, func, cls))
            }
            else {
                throw 'Array in non-multivalued context: '+JSON.stringify(obj)
            }
        }
        else if (typeof obj == 'object') {
            let nuObj = {}
            if (isCollection) {
                // TODO: check not inlined as list
                for (const [k, v] of Object.entries(obj)) {
                    nuObj[k] = this.walk(v, func, cls, )
                }
            }
            else {
                for (const [k, v] of Object.entries(obj)) {
                    const slot = this.induced_slot(k, cls)
                    const range = slot.range
                    const range_cls = this.get_class(range) // TODO: enums
                    // TODO! tsgen should not make string here
                    nuObj[k] = this.walk(v, func, range_cls, slot.multivalued)
                }
            }
            return func(nuObj, cls)
        }
        else {
            if (isCollection) {
                throw 'Expected array '+JSON.stringify(obj)
            }
            return func(obj, cls)
        }
    }
}