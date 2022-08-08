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
        const view = await SchemaView.load(SCHEMA_WITH_IMPORTS)
        const closure = await view.importsClosure()
        expect(closure).toEqual(['kitchen_sink', 'core', 'linkml:types'])

        expect(await view.inSchema('Person')).toEqual('kitchen_sink')
        expect(await view.inSchema('id')).toEqual('core')
        expect(await view.inSchema('name')).toEqual('core')
        expect(await view.inSchema('activity')).toEqual('core')
        expect(await view.inSchema('string')).toEqual('types')
    })
})

test('SchemaView.mergeImports', async () => {
    const view = await SchemaView.load(SCHEMA_WITH_IMPORTS)
    await view.mergeImports()
})