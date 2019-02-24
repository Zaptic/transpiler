import * as Transpiler from '../transpiler'

export type JoiSchema = string

interface ResolvedProperty {
    isOptional: boolean
    name: string
    resolvedType: JoiSchema
}

export function buildLiteral(literal: number | string | boolean | bigint): JoiSchema {
    if (typeof literal === 'number') return `Joi.equal(${literal})`
    return `Joi.equal("${literal}")`
}

function buildPrimitive(type: string): JoiSchema {
    switch (type) {
        case 'any':
            return buildAny()
        case 'void':
            return 'Joi.allow(undefined)'
        case 'null':
            return `Joi.allow(null)`
        case 'undefined':
            return 'Joi.allow(undefined)'
        case 'never':
            return `Joi.only()`
        case 'string':
            return `Joi.string()`
        case 'number':
            return `Joi.number()`
        case 'boolean':
            return `Joi.boolean()`
        case 'bigint':
            return `Joi.string()`

        default:
            throw new Error(`Unsupported type please open an issue on github`)
    }
}

function buildArray(resolvedType: JoiSchema): JoiSchema {
    return `Joi.array().items(${resolvedType})`
}

function buildTuple(resolvedTypes: JoiSchema[]): JoiSchema {
    return `Joi.array().ordered([${resolvedTypes.join(',')}])`
}

function buildEnum(resolvedEnum: Array<[string, JoiSchema]>): JoiSchema {
    return `Joi.only([${resolvedEnum.map(([_, schema]) => schema).join(',')}])`
}

function buildUnion(resolvedTypes: JoiSchema[]): JoiSchema {
    return `Joi.alternatives([${resolvedTypes.join(',')}])`
}

function buildIntersection(resolvedTypes: JoiSchema[]): JoiSchema {
    // Keys don't accept joi objects so we need to remove Joi.object().
    // We only remove "Joi.object" because the extra parens are still valid JS.
    const keys = resolvedTypes.map(type => `.keys(${type.replace('Joi.object', '')})`)
    return `Joi.object()${keys.join('')}`
}

function buildObject(properties: ResolvedProperty[], type: Transpiler.TypeIdentification): JoiSchema {
    const properiesSchema = properties.map(({ isOptional, name, resolvedType }) => {
        if (isOptional) return `${name}: ${resolvedType}.optional()`
        return `${name}: ${resolvedType}`
    })
    const schema = `Joi.object({ ${properiesSchema.join(',')} })`

    // Update the definitions if the current type was self referencing
    const currentDefinition = definitionsMap.get(type.name)
    if (currentDefinition === '') {
        definitionsMap.set(type.name, schema)
        // If we know that the current type is self referencing and we will have it in the definitions portion we
        // don't have to write the whole type in the actual "body" we can simply use the reference to avoid repetition
        return buildReference(type)
    }

    return schema
}

function buildIndexableObject(resolvedType: JoiSchema) {
    return `Joi.object().pattern('.*', ${resolvedType})`
}

function buildAny() {
    return 'Joi.any()'
}

/**
 * These are the types that are self referencing for which we need to create a definition
 */
const definitionsMap = new Map<string, JoiSchema>()

function startResolution() {
    definitionsMap.clear()
}

function endResolution(resolvedType: JoiSchema) {
    const result = `const resolvedType = ${resolvedType}`

    if (definitionsMap.size > 0) {
        const definitions: JoiSchema[] = []
        // Add a definitions section
        for (const [key, value] of definitionsMap.entries()) definitions.push(`const ${key} = ${value}`)

        return [...definitions, result].join('\n')
    }

    return result
}

function buildReference(type: Transpiler.TypeIdentification) {
    if (!definitionsMap.get(type.name)) definitionsMap.set(type.name, '')
    return `Joi.lazy(() => ${type.name})`
}

function buildDate() {
    return `Joi.date()`
}

export const module: Transpiler.Module<JoiSchema> = {
    buildAny,
    buildArray,
    buildDate,
    buildEnum,
    buildIndexableObject,
    buildIntersection,
    buildLiteral,
    buildObject,
    buildPrimitive,
    buildReference,
    buildTuple,
    buildUnion,
    endResolution,
    startResolution,
}
