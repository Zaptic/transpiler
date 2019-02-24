import { assert } from 'chai' // tslint:disable-line
import * as fs from 'fs'
import * as path from 'path'
import * as Joi from '../src/modules/joi'
import * as JsonSchema from '../src/modules/jsonSchema'
import * as Transpiler from '../src/transpiler'

// TODO make this friendlier to use
const skip: string[] = []
const only: string = ''
const moduleToRun: string = ''

describe('The Library', function() {
    const featuresRootFolder = path.resolve('test')

    const inputs = fs
        .readdirSync(featuresRootFolder)
        .filter(folder => !folder.endsWith('.ts'))
        .map(folder => [
            folder,
            path.join(featuresRootFolder, folder, `${folder}.input.ts`),
            path.join(featuresRootFolder, folder, `${folder}.expected.ts`),
        ])

    if (!moduleToRun) console.log('Running all modules')
    else console.log(`Only running "${moduleToRun}" module`)

    inputs.forEach(([featureName, inputFilePath, expectedFilePath]) => {
        if (skip.includes(featureName)) return console.log(`Skipping ${featureName}`)
        if (only && featureName !== only) return console.log(`Skipping ${featureName}`)

        it(`${featureName}`, async function() {
            if (!moduleToRun || moduleToRun === 'json') {
                const jsonResult = Transpiler.processFiles({ module: JsonSchema.module, filePaths: [inputFilePath] })
                const jsonExpected = (await import(expectedFilePath)).json

                assert.deepEqual(jsonResult.map(([_, schema]) => schema), jsonExpected)
            }

            if (!moduleToRun || moduleToRun === 'joi') {
                const joiResult = Transpiler.processFiles({ module: Joi.module, filePaths: [inputFilePath] })
                const joiExpected = (await import(expectedFilePath)).joi

                assert.deepEqual(joiResult.map(([_, schema]) => schema), joiExpected)
            }
        })
    })
})
