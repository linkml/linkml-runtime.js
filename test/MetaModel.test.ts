import {SchemaDefinition} from "../index"

let s: SchemaDefinition =
    {
        id: "t1",
        name: "x",
        slots:
            {
                "s1": {
                    name: "s1",
                    description: "test",
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
                slots: []
            }
        }
    }

describe('metamodel', function() {
    it('lookup', function() {
        expect(s.name).toBe("x");
    });
});