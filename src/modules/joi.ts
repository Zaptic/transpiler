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

    private readonly options: JoiModuleOptions = {
        allowEmptyStrings: true,
        assumeRequired: true,
    }

    constructor(options?: JoiModuleOptions) {
        this.options = { ...this.options, ...options }
    }

    public startResolution() {
        // do nothing
    }

    public buildLiteral(literal: number | string | boolean | bigint): JoiSchema {
        if (typeof literal === 'number' || typeof literal === 'boolean') return `Joi.equal(${literal})`
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
                return 'Joi.valid(undefined)'
            case 'null':
                return `Joi.valid(null)`
            case 'undefined':
                return 'Joi.valid(undefined)'
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
        return `Joi.alternatives([${resolvedEnum.map(([_, schema]) => schema).join(',')}])`
    }

    public buildUnion(resolvedTypes: JoiSchema[]): JoiSchema {
        if (resolvedTypes.length === 1) return resolvedTypes[0]

        return `Joi.alternatives([${resolvedTypes.join(',')}])`
    }

    public buildIntersection(resolvedTypes: JoiSchema[]): JoiSchema {
        // If something is lazy we remove the lazy part to make sure that we are dealing with objects only and then
        // We concatenate them
        const concats = resolvedTypes
            .map(lazyType => {
                if (lazyType.startsWith('Joi.lazy(() => ')) {
                    return lazyType.replace('Joi.lazy(() => ', '(')
                }

                return lazyType
            })
            .map(type => `.concat(${type})`)

        // The new object, result of all the concatenated parts
        const object = `Joi.object()${concats.join('')}`

        // If there were no lazy types we can produce an object that is the result of the concatenation
        if (resolvedTypes.find(resolvedType => resolvedType.startsWith('Joi.lazy')) === undefined) return object

        // If they are lazy types we propagate them
        return `Joi.lazy(() => ${object})`
    }

    public buildObject(properties: ResolvedProperty[]): JoiSchema {
        const propertiesSchema = properties
            // Handle the case when someone defined something like `{ property: undefined }` by ignoring that completely
            .filter(({ resolvedType }) => resolvedType !== 'Joi.valid(undefined)')
            .map(({ maybeUndefined, isOptional, name, resolvedType }) => {
                const nameString = name.includes('-') ? `'${name}'` : name

                if (isOptional || maybeUndefined) {
                    if (this.options.assumeRequired) return `${nameString}: ${resolvedType}.optional()`
                    return `${name}: ${resolvedType}`
                }
                if (this.options.assumeRequired) return `${nameString}: ${resolvedType}`

                return `${nameString}: ${resolvedType}.required()`
            })
        const schema = `Joi.object({ ${propertiesSchema.join(',')} })`

        return schema
    }

    public buildIndexableObject(resolvedType: JoiSchema) {
        return `Joi.object().pattern(/.*/, ${resolvedType})`
    }

    public buildReference(type: Transpiler.TypeIdentification) {
        return `Joi.lazy(() => ${type.name})`
    }

    public endResolution(resolvedType: JoiSchema, definitionsMap: Map<string, JoiSchema>) {
        return JoiModule.mergeDefinition(resolvedType, definitionsMap)
    }
}
