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

function buildObject(properties: Array<{ isOptional: boolean; name: string; resolvedType: JsonSchema }>): JsonSchema {
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

export const module: Transpiler.Module<JsonSchema> = {
    buildAny,
    buildArray,
    buildEnum,
    buildIndexableObject,
    buildIntersection,
    buildLiteral,
    buildObject,
    buildPrimitive,
    buildTuple,
    buildUnion,
}
