import {SchemaDefinition, Definition, ClassDefinition, SlotDefinition, ClassDefinitionName, SlotDefinitionName,
    EnumDefinition}
    from "./MetaModel";
import {SchemaView} from "./SchemaView";

export class WalkerState {
    inCollection: boolean = false
    instanceOf: ClassDefinition | SlotDefinition | EnumDefinition = null
    readonly objectPath: Object[] = []

    public constructor(init?:Partial<WalkerState>) {
        Object.assign(this, init);
    }

    depth(): number {
        return this.objectPath.length
    }

    /**
     * clones and deepens the path
     * @param object - add to path
     */
    deepen(object: Object): WalkerState {
        const newState = new WalkerState({
                objectPath: this.objectPath.concat([object]),
                inCollection: this.inCollection,
                instanceOf: this.instanceOf
            })
        return newState
    }
}


/**
 * operations over schemas
 */
export class Walker {
    schemaView: SchemaView
    mutate: boolean = false
    inferType: boolean = false
    strict: boolean = true

    constructor(schemaView: SchemaView) {
        this.schemaView = schemaView
    }

    /**
     *
     * @param obj
     * @param func
     * @param state
     */
    walk(obj: Object, func: Function, state: WalkerState = new WalkerState()): any {
        if (obj instanceof Array) {
            if (state.inCollection || !this.strict) {
                state.inCollection = false
                return obj.map(x => this.walk(x, func, state))
            }
            else {
                throw 'Array in non-multivalued context: '+JSON.stringify(obj)
            }
        }
        else if (typeof obj == 'object') {
            let nuObj = {}
            if (state.inCollection) {
                state.inCollection = false
                // TODO: check not inlined as list
                for (const [k, v] of Object.entries(obj)) {
                    nuObj[k] = this.walk(v, func, state)
                }
            }
            else {
                let newState = state.deepen(obj)
                for (const [k, v] of Object.entries(obj)) {
                    const slot = this.schemaView.inducedSlot(k, state.instanceOf)
                    // TODO
                    //let curr = state.instanceOf
                    //let newState = new WalkerState(state)
                    newState.instanceOf = this.schemaView.slotRange(slot)
                    //console.log('k='+k+' /// range: '+curr+" -> "+state.instanceOf)
                    newState.inCollection = slot.multivalued
                    // TODO! tsgen should not make string here
                    nuObj[k] = this.walk(v, func, newState)
                    //state.instanceOf = curr
                }
            }
            return func(nuObj, state)
        }
        else {
            if (state.inCollection && this.strict) {
                throw 'Expected array '+JSON.stringify(obj)
            }
            return func(obj, state)
        }
    }
}