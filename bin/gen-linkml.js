#!/usr/bin/env node
const { writeFile } = require('fs/promises')
const { Option, program } = require('commander')
const YAML = require('yaml')

const { SchemaView } = require('..')

const FORMATS = ['json', 'yaml']

program
  .option('--no-materialize-attributes', 'do not materialize induced slots as attributes')
  .option('--no-merge-imports', 'do not merge imports into source file')
  .option('-o, --output <path>', 'path of file to write to')
  .addOption(new Option('-f, --format <format>', 'output format').choices(FORMATS).default(FORMATS[0]))
  .argument('<schema>', 'YAML schema file')
  .action(async function (schema, options) {
    const view = await SchemaView.load(schema, true)

    if (options.mergeImports) {
      await view.mergeImports()
    }

    if (options.materializeAttributes) {
      const allClasses = view.allClasses()
      for (const [className, classDef] of allClasses) {
        const attrs = view.classInducedSlots(className)
        if (attrs && attrs.length && !classDef.attributes) {
          classDef.attributes = {}
        }
        for (const attr of attrs) {
          classDef.attributes[attr.name] = attr
        }
      }
    }

    let result
    if (options.format === 'json') {
      result = JSON.stringify(view.schema, null, 2)
    } else if (options.format === 'yaml') {
      result = YAML.stringify(view.schema)
    }
    
    if (options.output) {
      writeFile(options.output, result)
    } else {
      console.log(result)
    }
  })
  .parseAsync()

