import path from 'path'

import {SchemaDefinition} from "../index"
import {SchemaView, TraversalOptions} from "../index"

let s: SchemaDefinition =
    {
        id: "t1",
        name: "x",
        slots:
            {
                "s1": {
                    name: "s1",
                    description: "test",
                    //range: "s1r",
                    is_a: "s2"
                },
                "s2": {
                    name: "s2",
                    range: "s2r",
                }
            },
        classes: {
            "m1": {
                name: "m1"
            },
            "c1": {
                name: "c1",
                is_a: "c2",
                mixins: ["m1"],
                slots: ["s1"]
            },
            "c2": {
                name: "c2",
                is_a: "c3",
                mixins: [],
                slots: [],
                slot_usage: {
                    "s1": {
                        "name": "s1",
                        "range": "s1r_c2"
                    }
                }
            },
            "c3": {
                name: "c3",
            }
        }
    };

const SCHEMA_NO_IMPORTS = path.join(__dirname, 'inputs', 'kitchen_sink_noimports.yaml')
const SCHEMA_WITH_IMPORTS = path.join(__dirname, 'inputs', 'kitchen_sink.yaml')

describe('walk', function() {
    let sv = new SchemaView(s)
    let c = sv.get_class("c1")

    it('walk', function () {
        //let opts: TraversalOptions = {mixins: false}
        //expect(sv.class_ancestors(c.name, opts)).toEqual(["c1", "c2", "c3"]);
    });
});

describe('SchemaView Constructor', () => {
    it('should accept an object', () => {
        const view = new SchemaView(s);
        expect(view.schema.name).toBe('x')
    })
})

describe('SchemaView.load', () => {
    it('should accept a path string', async () => {
        const view = await SchemaView.load(SCHEMA_NO_IMPORTS)
        expect(view.schema.name).toBe('kitchen_sink')
    })
})

describe('schemaview', function() {
    let sv = new SchemaView(s)
    let c = sv.get_class("c1")

    it('ancestors-no-mixins', function() {
        let opts: TraversalOptions = {mixins: false}
        expect(sv.class_ancestors(c.name, opts)).toEqual(["c1", "c2", "c3"]);
    });
    it('ancestors-with-mixins', function() {
        let opts: TraversalOptions = {mixins: true}
        expect(sv.class_ancestors(c.name, opts)).toEqual(["c1", "c2", "m1", "c3"]);
    });
    it('induced-slots', function() {
        let opts: TraversalOptions = {mixins: true}
        let islot = sv.induced_slot("s1", "c1")
        expect(islot.name).toEqual("s1");
        expect(islot.range).toEqual("s1r_c2");
    });

});

describe('SchemaView Imports', () => {
    it('should return correct imports closure', async () => {
        const view = await SchemaView.load(SCHEMA_WITH_IMPORTS, true)

        expect(view.importsClosure()).toEqual(['kitchen_sink', 'core', 'linkml:types'])

        expect(view.inSchema('Person')).toEqual('kitchen_sink')
        expect(view.inSchema('id')).toEqual('core')
        expect(view.inSchema('name')).toEqual('core')
        expect(view.inSchema('activity')).toEqual('core')
        expect(view.inSchema('string')).toEqual('types')

        expect(view.allClasses().keys()).toContain('activity')
        expect(view.allClasses('preserve', false).keys()).not.toContain('activity')

        const allTypesNoImports = view.allTypes(false)
        expect(view.allTypes().keys()).toContain('string')
        expect(allTypesNoImports.keys()).not.toContain('string')

        expect(view.typeAncestors('SymbolString').sort()).toEqual(['SymbolString', 'string'])

        for (const [typeName, type] of view.allTypes()) {
            expect(type.name).toEqual(typeName)
            const inducedType = view.inducedType(typeName)
            expect(inducedType.uri).not.toBeUndefined()
            expect(inducedType.base).not.toBeUndefined()
            if (typeName in allTypesNoImports.keys()) {
                expect(type.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
            } else {
                expect(['https://w3id.org/linkml/tests/core', 'https://w3id.org/linkml/types']).toContain(type.from_schema)
            }
        }
    })
})

test('SchemaView.mergeImports', async () => {
    const view = await SchemaView.load(SCHEMA_WITH_IMPORTS, true)

    const allClasses = view.allClasses()
    const allClassesNoImport = view.allClasses('preserve', false)
    expect(allClassesNoImport.size).toBeLessThan(allClasses.size)

    await view.mergeImports()
    
    const allClasses2 = view.allClasses()
    expect(allClasses.size).toEqual(allClasses2.size)

    const allClassesNoImport2 = view.allClasses('preserve', false)
    expect(allClassesNoImport2.size).toEqual(allClasses2.size)
})