import * as Transpiler from '../transpiler'

export type JoiSchema = string

type ResolvedProperty = Transpiler.ResolvedProperty<JoiSchema>

interface JoiModuleOptions {
    /**
     * default true;
     * When set to true it will assume that presence is set to 'required' in joi. This means that this module only
     * supports the 'optional' and 'required' modes that joi offers
     * See https://github.com/hapijs/joi/blob/v14.3.1/API.md#validatevalue-schema-options-callback
     */
    assumeRequired?: boolean
    /**
     * default true;
     * Will generate string definitions as `.string().allow('')` which is how TS behaves
     * See https://github.com/hapijs/joi/blob/v14.3.1/API.md#anyallowvalue
     */
    allowEmptyStrings?: boolean
}

export class JoiModule implements Transpiler.Module<JoiSchema> {
    public static mergeDefinition(resolvedType: JoiSchema, definitionsMap: Map<string, JoiSchema>) {
        const result = `const resolvedType = ${resolvedType}`
        if (definitionsMap.size === 0) return result

        const definitions: JoiSchema[] = []
        // Add a definitions section
        for (const [key, value] of definitionsMap.entries()) definitions.push(`const ${key} = ${value}`)

        return [...definitions, result].join('\n')
    }
    /**
     * These are the types that are self referencing for which we need to create a definition
     */
    private definitionsMap = new Map<string, JoiSchema>()
    private readonly options: JoiModuleOptions = {
        allowEmptyStrings: true,
        assumeRequired: true,
    }

    constructor(options?: JoiModuleOptions) {
        this.options = { ...this.options, ...options }
    }

    public startResolution() {
        this.definitionsMap.clear()
    }

    public buildLiteral(literal: number | string | boolean | bigint): JoiSchema {
        if (typeof literal === 'number') return `Joi.equal(${literal})`
        return `Joi.equal("${literal}")`
    }

    public buildDate() {
        return `Joi.date()`
    }

    public buildAny() {
        return 'Joi.any()'
    }

    public buildPrimitive(type: string): JoiSchema {
        switch (type) {
            case 'any':
                return this.buildAny()
            case 'void':
                return 'Joi.allow(undefined)'
            case 'null':
                return `Joi.allow(null)`
            case 'undefined':
                return 'Joi.allow(undefined)'
            case 'never':
                return `Joi.forbidden()`
            case 'string':
                if (this.options.allowEmptyStrings) return `Joi.string().allow('')`
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

    public buildArray(resolvedType: JoiSchema): JoiSchema {
        return `Joi.array().items(${resolvedType})`
    }

    public buildTuple(resolvedTypes: JoiSchema[]): JoiSchema {
        return `Joi.array().ordered([${resolvedTypes.join(',')}])`
    }

    public buildEnum(resolvedEnum: Array<[string, JoiSchema]>): JoiSchema {
        return `Joi.only([${resolvedEnum.map(([_, schema]) => schema).join(',')}])`
    }

    public buildUnion(resolvedTypes: JoiSchema[]): JoiSchema {
        // If a union of types is composed of a type T OR undefined then we can reduce that to T.
        const filteredTypes = resolvedTypes.filter(resolvedType => resolvedType !== 'Joi.allow(undefined)')
        if (filteredTypes.length === 1) return filteredTypes[0]

        return `Joi.alternatives([${resolvedTypes.join(',')}])`
    }

    public buildIntersection(resolvedTypes: JoiSchema[]): JoiSchema {
        // Keys don't accept joi objects so we need to remove Joi.object().
        // We only remove "Joi.object" because the extra parens are still valid JS.
        const keys = resolvedTypes.map(type => `.keys(${type.replace('Joi.object', '')})`)
        return `Joi.object()${keys.join('')}`
    }

    public buildObject(properties: ResolvedProperty[], type: Transpiler.TypeIdentification): JoiSchema {
        const propertiesSchema = properties
            // Handle the case when someone defined something like `{ property: undefined }` by ignoring that completely
            .filter(({ resolvedType }) => resolvedType !== 'Joi.allow(undefined)')
            .map(({ maybeUndefined, isOptional, name, resolvedType }) => {
                if (isOptional || maybeUndefined) {
                    if (this.options.assumeRequired) return `${name}: ${resolvedType}.optional()`
                    return `${name}: ${resolvedType}`
                }
                if (this.options.assumeRequired) return `${name}: ${resolvedType}`
                return `${name}: ${resolvedType}.required()`
            })
        const schema = `Joi.object({ ${propertiesSchema.join(',')} })`

        // Update the definitions if the current type was self referencing
        const currentDefinition = this.definitionsMap.get(type.name)
        if (currentDefinition === '') {
            this.definitionsMap.set(type.name, schema)
            // If we know that the current type is self referencing and we will have it in the definitions portion we
            // don't have to write the whole type in the actual "body" we can simply use the reference
            return this.buildReference(type)
        }

        return schema
    }

    public buildIndexableObject(resolvedType: JoiSchema) {
        return `Joi.object().pattern(/.*/, ${resolvedType})`
    }

    public buildReference(type: Transpiler.TypeIdentification) {
        if (!this.definitionsMap.get(type.name)) this.definitionsMap.set(type.name, '')
        return `Joi.lazy(() => ${type.name})`
    }

    public endResolution(resolvedType: JoiSchema) {
        return JoiModule.mergeDefinition(resolvedType, this.definitionsMap)
    }

    public endResolutionWithDefinitions(resolvedType: JoiSchema) {
        return { resolvedType, definitionsMap: this.definitionsMap }
    }
}
