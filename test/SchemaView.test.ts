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

        const allClasses = view.allClasses()
        const allClassesNoImport = view.allClasses('preserve', false)
        expect(allClasses.keys()).toContain('activity')
        expect(allClassesNoImport.keys()).not.toContain('activity')

        const allTypes = view.allTypes()
        const allTypesNoImports = view.allTypes(false)
        expect(allTypes.keys()).toContain('string')
        expect(allTypesNoImports.keys()).not.toContain('string')

        expect(view.typeAncestors('SymbolString').sort()).toEqual(['SymbolString', 'string'])

        for (const [typeName, type] of allTypes) {
            expect(type.name).toEqual(typeName)
            const inducedType = view.inducedType(typeName)
            expect(inducedType.uri).not.toBeUndefined()
            expect(inducedType.base).not.toBeUndefined()
            if (allTypesNoImports.has(typeName)) {
                expect(type.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
            } else {
                expect(['https://w3id.org/linkml/tests/core', 'https://w3id.org/linkml/types']).toContain(type.from_schema)
            }
        }

        const allEnums = view.allEnums()
        const allEnumsNoImports = view.allEnums(false)
        for (const [enumName, enumDefn] of allEnums) {
            expect(enumDefn.name).toEqual(enumName)
            if (allEnumsNoImports.has(enumName)) {
                expect(enumDefn.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
            } else {
                expect(enumDefn.from_schema).toEqual('https://w3id.org/linkml/tests/core')
            }
        }

        const allSlots = view.allSlots()
        const allSlotsNoImports = view.allSlots(false)
        for (const [slotName, slot] of allSlots) {
            expect(slot.name).toEqual(slotName)
            if (allSlotsNoImports.has(slotName)) {
                expect(slot.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
            } else {
                expect(slot.from_schema).toEqual('https://w3id.org/linkml/tests/core')
            }
        }

        for (const [className, cls] of allClasses) {
            expect(cls.name).toEqual(className)
            if (allClassesNoImport.has(className)) {
                expect(cls.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
            } else {
                expect(cls.from_schema).toEqual('https://w3id.org/linkml/tests/core')
            }
            for (const slot of view.classInducedSlots(className)) {
                if (Array.from(allClassesNoImport.values()).includes(slot)) {
                    expect(slot.slot_uri).toBeUndefined()
                    expect(slot.from_schema).toEqual('https://w3id.org/linkml/tests/kitchen_sink')
                }
            }
        }

        for (const className of ['Company', 'Person', 'Organization', 'Thing']) {
            expect(view.induced_slot('id', className).identifier).toEqual(true)
            expect(view.induced_slot('name', className).identifier).not.toEqual(true)
            expect(view.induced_slot('name', className).required).toEqual(false)
            // TODO: This should be coming from the schema default_range
            // expect(view.induced_slot('name', className).range).toEqual('string')
        }
        for (const className of ['Event', 'EmploymentEvent', 'MedicalEvent']) {
            const slot = view.induced_slot('started at time', className)
            expect(slot.range).toEqual('date')
            expect(slot.slot_uri).toEqual('prov:startedAtTime')
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