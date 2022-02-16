import {ClassDefinition, LocalName, LocalNameLocalNameSource, SchemaDefinition, SlotDefinition, SlotDefinitionName} from "../index"
import {SchemaView, TraversalOptions} from "../index"
import {Walker, WalkerState} from "../src/Walker";

enum Foo {
    A = "abc",
    B = "B",
    C = "C"
}

const x : Foo = Foo.A
console.log('FOO='+JSON.stringify(x))

function slot(name, range='string'): SlotDefinition {
    return {
        name: name,
        range: range
    }
}

function attrs(objs: Object[]): {[index: SlotDefinitionName]: SlotDefinition } {
    let attrs = {}
    for (let obj of objs) {
        let a: SlotDefinition = obj
        attrs[a.name] = a
    }
    return attrs
}

let FamilialRelationship: ClassDefinition = {
    name: "FamilialRelationship",
    attributes: attrs([
        {name: "type"},
        {name: "time_started"},
        {name: "related_to",
        range: "Person"},
    ])
}
let Person: ClassDefinition = {
    name: "Person",
    attributes: attrs(
        [
            {name: "id", identifier: true},
            {name: "name"},
            {name: "description"},
            {name: "familial_relationships",
                multivalued: true,
                inlined: true,
                range: FamilialRelationship.name}]
    )
};

let Container: ClassDefinition = {
    name: "Container",
    attributes: {
        persons: {
            name: "persons",
            range: Person.name,
            multivalued: true,
            inlined: true
        }
    }
}

let PersonSchema: SchemaDefinition =
    {
        id: "personschema",
        name: "psc",
        classes: {
            Container: Container,
            Person: Person,
            FamilialRelationship: FamilialRelationship,
        }

    };

let data = {
    persons: [
        {id: "P1", name: "p1"},
        {id: "P2", name: "p2",
        familial_relationships: [
            {
                type: 'SIBLING_OF',
                related_to: "P1"
            }
        ]},
        {id: "P3", name: "p3",
            familial_relationships: [
                {
                    type: 'SIBLING_OF',
                    related_to: "P2"
                },
                {
                    type: 'PARENT_OF',
                    related_to: "P4"
                }
                ]
        },
    ]
}

describe('walk', function() {
    let sv = new SchemaView(PersonSchema)
    let walker = new Walker(sv)

    it('deepen', function () {
        let state = new WalkerState()
        let state2 = state.deepen('foo')
        expect(state2.depth()).toBe(1)
        expect(state.depth()).toBe(0)
        let state3 = new WalkerState(state)

    });

    it('walk', function () {
        let state = new WalkerState()
        state.deepen('foo')
        state.instanceOf = Container
        let num = 0
        let maxDepth = 0
        function _add(x, s: WalkerState) {
            num += 1
            if (s.depth() > maxDepth) {
                maxDepth = s.depth()
            }
            if (s.depth() == 6) {
                console.log('#########')
                for (let x of s.objectPath) {
                    console.log('   *** '+JSON.stringify(x))
                }
            }
        }
        walker.walk(data, _add, state)
        expect(num).toBeGreaterThan(10)
        expect(maxDepth).toEqual(3)
        console.log('STTATS: '+num+" // "+maxDepth)
    });
});
