import * as Transpiler from '../transpiler'

export type JsonSchemaLiteral = string | number | boolean | bigint

// Complex as opposed to literal - can't find a better word
export interface JsonSchemaComplex {
    additionalProperties?: boolean
    allOf?: JsonSchema[]
    anyOf?: JsonSchema[]
    description?: string
    enum?: JsonSchemaLiteral[]
    items?: JsonSchema | JsonSchema[]
    properties?: { [key: string]: JsonSchema }
    required?: string[]
    type?: string
    $ref?: string
    definitions?: { [key: string]: JsonSchema }
}

interface ResolvedProperty {
    isOptional: boolean
    name: string
    resolvedType: JsonSchema
}

export type JsonSchema = JsonSchemaLiteral | JsonSchemaComplex

export function buildLiteral(literal: number | string | boolean | bigint): JsonSchema {
    return { enum: [literal] }
}

function buildPrimitive(type: string): JsonSchema {
    switch (type) {
        case 'any':
            return buildAny()
        case 'void':
            return { type: 'undefined' }
        case 'null':
            return { type: 'null' }
        case 'undefined':
            return { type: 'undefined' }
        case 'never':
            return { description: 'This is a never type', allOf: [{ type: 'string' }, { type: 'number' }] }
        case 'string':
            return { type: 'string' }
        case 'number':
            return { type: 'number' }
        case 'boolean':
            return { type: 'boolean' }
        case 'bigint':
            return { description: 'This is a bigint', type: 'number' }

        default:
            throw new Error(`Unsupported type please open an issue on github`)
    }
}

function buildArray(resolvedType: JsonSchema): JsonSchema {
    return { type: 'array', items: resolvedType }
}

function buildTuple(resolvedTypes: JsonSchema[]): JsonSchema {
    return { type: 'array', items: resolvedTypes }
}

function buildEnum(resolvedEnum: Array<[string, JsonSchema]>): JsonSchema {
    return { anyOf: resolvedEnum.map(([_, schema]) => schema) }
}

function buildUnion(resolvedTypes: JsonSchema[]): JsonSchema {
    return { anyOf: resolvedTypes }
}

function buildIntersection(resolvedTypes: JsonSchema[]): JsonSchema {
    const intersection: JsonSchema = {
        additionalProperties: false,
        properties: {},
        type: 'object',
    }

    const required = new Set<string>()

    // Merge the declarations
    resolvedTypes.forEach(part => {
        const schema = part as JsonSchemaComplex // Unions are made of complex types TODO improve types around here
        intersection.properties = { ...intersection.properties, ...schema.properties }
        if (schema.required !== undefined) schema.required.forEach(value => required.add(value))
    })

    if (required.size > 0) intersection.required = [...required.values()]

    return intersection
}

function buildObject(properties: ResolvedProperty[], type: Transpiler.TypeIdentification): JsonSchema {
    const schema = {
        additionalProperties: false,
        properties: {} as { [key: string]: JsonSchema },
        required: [] as string[],
        type: 'object',
    }

    properties.forEach(({ isOptional, name, resolvedType }) => {
        if (!isOptional) schema.required.push(name)
        schema.properties[name] = resolvedType
    })

    // Remove the required if it's not required
    if (schema.required.length === 0) delete schema.required

    // Update the definitions if the current type was self referencing
    const currentDefinition = definitionsMap.get(type.name)
    if (currentDefinition) {
        definitionsMap.set(type.name, schema)
        // If we know that the current type is self referencing and we will have it in the definitions portion we
        // don't have to write the whole type in the actual "body" we can simply use the reference to avoid repetition
        return buildReference(type)
    }

    return schema
}

function buildIndexableObject(resolvedType: JsonSchema) {
    return {
        additionalProperties: false,
        patternProperties: { '.*': resolvedType },
        properties: {}, // Don't know if this is needed, taken from http://json-schema.org/example2.html
        type: 'object',
    }
}

function buildAny() {
    return {}
}

/**
 * These are the types that are self referencing for which we need to create a definition
 */
const definitionsMap = new Map<string, JsonSchema>()

function startResolution() {
    definitionsMap.clear()
}

function endResolution(resolvedType: JsonSchema) {
    if (definitionsMap.size > 0) {
        const definitions: JsonSchemaComplex['definitions'] = {}

        // Add a definitions section
        for (const [key, value] of definitionsMap.entries()) definitions[key] = value

        return { ...(resolvedType as JsonSchemaComplex), definitions }
    }

    return resolvedType
}

function buildReference(type: Transpiler.TypeIdentification) {
    if (!definitionsMap.get(type.name)) definitionsMap.set(type.name, {})
    return { $ref: `#/definitions/${type.name}` }
}

function buildDate() {
    return { description: 'This is a date', type: 'string' }
}

export const module: Transpiler.Module<JsonSchema> = {
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
