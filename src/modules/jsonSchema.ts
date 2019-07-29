import * as Transpiler from '../transpiler'

export type JsonSchemaLiteral = string | number | boolean | bigint

// Complex as opposed to literal - can't find a better word
export interface JsonSchema {
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

type ResolvedProperty = Transpiler.ResolvedProperty<JsonSchema>

export class JsonSchemaModule implements Transpiler.Module<JsonSchema> {
    public static mergeDefinition(resolvedType: JsonSchema, definitionsMap: Map<string, JsonSchema>) {
        if (definitionsMap.size === 0) return resolvedType

        const definitions: JsonSchema['definitions'] = {}

        // Add a definitions section
        for (const [key, value] of definitionsMap.entries()) definitions[key] = value

        return { ...resolvedType, definitions }
    }

    /**
     * These are the types that are self referencing for which we need to create a definition
     */
    private definitionsMap = new Map<string, JsonSchema>()

    public startResolution() {
        this.definitionsMap.clear()
    }

    public buildLiteral(literal: number | string | boolean | bigint): JsonSchema {
        return { enum: [literal] }
    }

    public buildDate() {
        return { description: 'This is a date', type: 'string' }
    }

    public buildPrimitive(type: string): JsonSchema {
        switch (type) {
            case 'any':
                return this.buildAny()
            case 'void':
            case 'undefined':
                // `undefined` is not supported by json spec. We're going to use this to know when to take a type
                // and make it optional later on. If someone was to try and expose a type that's only undefined
                // then we might want to raise that as an invalid type in some way. Alternatively we could leave that
                // to their schema checker as that's a pretty obvious mistake
                // TODO figure out a good strategy to handle undefined
                return { type: 'undefined' }
            case 'null':
                return { type: 'null' }
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

    public buildAny() {
        return {}
    }

    public buildArray(resolvedType: JsonSchema): JsonSchema {
        return { type: 'array', items: resolvedType }
    }

    public buildTuple(resolvedTypes: JsonSchema[]): JsonSchema {
        return { type: 'array', items: resolvedTypes }
    }

    public buildEnum(resolvedEnum: Array<[string, JsonSchema]>): JsonSchema {
        return { anyOf: resolvedEnum.map(([_, schema]) => schema) }
    }

    public buildUnion(resolvedTypes: JsonSchema[]): JsonSchema {
        // If a union of types is composed of a type T OR undefined then we can reduce that to T.
        const filteredTypes = resolvedTypes.filter(resolvedType => resolvedType.type !== 'undefined')
        if (filteredTypes.length === 1) return filteredTypes[0]

        return { anyOf: resolvedTypes }
    }

    public buildIntersection(resolvedTypes: JsonSchema[]): JsonSchema {
        const intersection: JsonSchema = {
            additionalProperties: false,
            properties: {},
            type: 'object',
        }

        const required = new Set<string>()

        // Merge the declarations
        resolvedTypes.forEach(part => {
            const schema = part // Unions are made of complex types TODO improve types around here
            intersection.properties = { ...intersection.properties, ...schema.properties }
            if (schema.required !== undefined) schema.required.forEach(value => required.add(value))
        })

        if (required.size > 0) intersection.required = [...required.values()]

        return intersection
    }

    public buildObject(properties: ResolvedProperty[], type: Transpiler.TypeIdentification): JsonSchema {
        const schema = {
            additionalProperties: false,
            properties: {} as { [key: string]: JsonSchema },
            required: [] as string[],
            type: 'object',
        }

        properties.forEach(({ maybeUndefined, isOptional, name, resolvedType }) => {
            // Handle the case when someone defined something like `{ property: undefined }` by ignoring that completely
            if (resolvedType.type === 'undefined') return

            if (!isOptional && !maybeUndefined) schema.required.push(name)
            schema.properties[name] = resolvedType
        })

        // Remove the required if it's not required
        if (schema.required.length === 0) delete schema.required

        // Update the definitions if the current type was self referencing
        const currentDefinition = this.definitionsMap.get(type.name)
        if (currentDefinition) {
            this.definitionsMap.set(type.name, schema)
            // If we know that the current type is self referencing and we will have it in the definitions portion we
            // don't have to write the whole type in the actual "body" we can simply use the reference
            return this.buildReference(type)
        }

        return schema
    }

    public buildIndexableObject(resolvedType: JsonSchema) {
        return {
            additionalProperties: false,
            patternProperties: { '.*': resolvedType },
            properties: {}, // Don't know if this is needed, taken from http://json-schema.org/example2.html
            type: 'object',
        }
    }

    public buildReference(type: Transpiler.TypeIdentification) {
        if (!this.definitionsMap.get(type.name)) this.definitionsMap.set(type.name, {})
        return { $ref: `#/definitions/${type.name}` }
    }

    public endResolution(resolvedType: JsonSchema) {
        return JsonSchemaModule.mergeDefinition(resolvedType, this.definitionsMap)
    }

    public endResolutionWithDefinitions(resolvedType: JsonSchema) {
        return { resolvedType, definitionsMap: this.definitionsMap }
    }
}
