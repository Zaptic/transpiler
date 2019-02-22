import { assert } from 'chai' // tslint:disable-line
import * as fs from 'fs'
import * as path from 'path'
import { module } from '../src/modules/jsonSchema'
import { processFiles } from '../src/transpiler'

// TODO make this friendlier to use
const skip: string[] = []
const only: string = ''

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

    inputs.forEach(([featureName, inputFilePath, expectedFilePath]) => {
        it(`${featureName}`, async function() {
            if (skip.includes(featureName)) return console.log(`Skipping ${featureName}`)
            if (only && featureName !== only) return console.log(`Skipping ${featureName}`)

            const result = processFiles({ module, filePaths: [inputFilePath] })
            const expected = (await import(expectedFilePath)).default

            assert.deepEqual(result.map(([_, schema]) => schema), expected)
        })
    })
})
