import {SchemaDefinition, Definition, ClassDefinition, SlotDefinition, ClassName, SlotName}
    from "./MetaModel";

export type Name = ClassName | SlotName

function isDefinition(x: Definition | Name): x is Definition {
    return (<Definition>x).name !== undefined;
}


function _closure(f, x, reflexive=true) {
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

interface TraversalSpecificOptions {
    mixins?: boolean,
    is_a?: boolean,
    reflexive?: boolean
}

interface ImportOptions {
    imports?: boolean,
}

export type TraversalOptions = TraversalSpecificOptions & ImportOptions

/**
 * operations over schemas
 */
export class SchemaView {
    schema: SchemaDefinition
    virtual_schema: SchemaDefinition

    constructor(schema: SchemaDefinition) {
        this.schema = schema
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
    get_class(name: ClassName | ClassDefinition): ClassDefinition {
        if (isDefinition(name)) {
            return name
        }
        else {
            return this.virtual_schema.classes[name]
        }
    }

    /**
     * retrieve a SlotDefinition by its name
     *
     * @param name - class or class name
     */
    get_slot(name: SlotName | SlotDefinition): SlotDefinition {
        if (isDefinition(name)) {
            return name
        }
        else {
            return this.virtual_schema.slots[name]
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
    ancestors(elt: ClassDefinition | SlotDefinition, opts: TraversalOptions): ClassName[] {
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
    class_parents(elt: ClassName | ClassDefinition, opts: TraversalOptions): ClassName[] {
        let c = this.get_class(elt)
        return this.parents(c, opts)
    }

    /**
     * All direct parents
     *
     * @param elt
     * @param opts
     */
    slot_parents(elt: SlotName | SlotDefinition, opts: TraversalOptions): SlotName[] {
        let s = this.get_slot(elt)
        return this.parents(s, opts)
    }

    /**
     * Finds all ancestors for a class
     *
     * @param elt
     * @param opts
     */
    class_ancestors(elt: ClassName | ClassDefinition, opts: TraversalOptions): ClassName[] {
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
    slot_ancestors(elt: SlotName | SlotDefinition, opts: TraversalOptions): SlotName[] {
        let t = this
        let f = function (x) {
            return t.slot_parents(x, opts)
        }
        return _closure(f, elt)
    }



    induced_slot(slot_name: SlotName, class_name: ClassName, opts: TraversalOptions): SlotDefinition {
        // TODO
        return this.get_slot(slot_name)
    }
}