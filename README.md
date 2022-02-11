# linkml-runtime.js

Status: EXPERIMENTAL

This is an experimental translation of [linkml-runtime](https://github.com/linkml/linkml-runtime) to Typescript/Javascript

The goal is to be as lightweight as possible. Currently there are two modules:

* [MetaModel](./src/MetaModel.ts)
    - this is an automated translation of the linkml metamodel to Typescript
    - this is entirely interface/type declarations - the compiled js is empty
* [SchemaView](./src/SchemaView.ts)
    - manual translation (HIGHLY INCOMPLETE) of schemaview.py

For examples see test/data

You can convert a linkml schema to typescript using `gen-typescript` (part of the main linkml package)


