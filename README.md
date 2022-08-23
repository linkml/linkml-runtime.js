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

## Development

Install dependencies using

```shell
yarn
```

### `yarn test`

Runs the full Jest test suite. See the [Jest documentation](https://jestjs.io/docs/cli) for more command line options.

### `yarn build`

Compile TypeScript to JavaScript

## Release 

To release a new version start by checking out the `main` branch and then run

```shell
yarn version
```

This will automatically run build and test. If successful you will be prompted for a new version number. You can also use the `--major`, `--minor`, or `--patch` options to avoid specifying the new version number manually (see [Yarn docs](https://classic.yarnpkg.com/en/docs/cli/version#toc-commands) for more information). The result of this command will be a new commit to the `main` branch as well as a new tag based on the version number, all of which is automatically pushed to GitHub. To complete the process, make a new GitHub release based on the newly created version tag. Creating the GitHub release will automatically publish the version to NPM.

