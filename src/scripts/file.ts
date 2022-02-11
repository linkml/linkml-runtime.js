import {SchemaDefinition} from "../MetaModel"
import {SchemaView, TraversalOptions} from "../SchemaView"

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
    };

function displayTotalPerPerson(person: string, total: number) {
    let message: string = "Total for " + person + " is " + total + " xx " + s.name;
    document.getElementById("totalMessage").innerText = message;
}

