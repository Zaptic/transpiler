import * as ts from 'typescript'
import * as Compiler from './compiler'
import { typeStringIsTypeName } from './helpers'
import * as Types from './types'

export interface ResolvedProperty<T> {
    isOptional: boolean
    maybeUndefined: boolean
    name: string
    resolvedType: T
}

export type Literal = string | number | boolean | bigint | ts.PseudoBigInt

/**
 * This identifies a type. The id is unique and the name can be used for display.
 */
export interface TypeIdentification {
    id: number
    name: string
}

type Primitive = 'any' | 'void' | 'undefined' | 'null' | 'never' | 'string' | 'number' | 'boolean' | 'bigint'

/**
 * This interface defines a module.
 *
 * In order to create a new module it is necessary to implement all these functions. Most of them should be quite simple
 */
export interface Module<T> {
    /**
     * Should create the structure corresponding to a typescript `any` type
     */
    buildAny: () => T
    /**
     * Should create the structure corresponding to a typescript `Date` type
     */
    buildDate: () => T
    /**
     * Should create the structure corresponding to a Primitive @see Primitive
     * @param typeString the name of the primitive
     */
    buildPrimitive: (typeString: Primitive) => T
    /**
     * Should create an array where each element is of the resolved type
     * @param resolvedType the type that was resolved for an element in the current array
     */
    buildArray: (resolvedType: T) => T
    /**
     * Should create a tuple like `[number, string, Object]`
     * @param resolvedTypes Array with each of the members of the tuple
     */
    buildTuple: (resolvedTypes: T[]) => T
    /**
     * Should create the structure corresponding to a typescript Union like `User | Error`
     * @param resolvedTypes Array with each of the members of the union
     *                      The order does not matter much here
     */
    buildUnion: (resolvedTypes: T[]) => T
    /**
     * Should create the structure corresponding to a typescript Intersection like `User & UserTeams`
     * @param resolvedTypes Array with each of the members of the intersection
     *                      The order matters in TS so make sure that's covered)
     */
    buildIntersection: (resolvedTypes: T[]) => T
    /**
     * Should create the structure corresponding to a typescript Enum like `enum Direction { Up=1, Down, Left, Right }`
     * @param resolvedTypes Array with each of the members of the enum represented by a `[key, value]`
     */
    buildEnum: (resolvedTypes: Array<[string, T]>) => T
    /**
     * Should create the structure corresponding to a literal value like `5` or `'hello'`
     * @param literal the literal value
     */
    buildLiteral: (literal: string | number | boolean | bigint) => T
    /**
     * Should create the structure corresponding to an object like `{ foo: 1, goo: Object }`
     * @param properties an array of the resolved properties of the type
     * @param type the unique identifier for this type (name + id).
     *             Please note that the id is only unique within one invocation of the process function.
     *             This means that calling process twice on the same file does not guarantee that the ids will stay
     *             the same. These ids are exposed by typescript. And can be used to keep track of recurring type
     *             definitions.
     *             We recommend keeping a `Map<name, T>` of all the definitions so they can be used to detect recurrence
     *             withing the type definitions. See the sample modules for more details on possible implementations.
     */
    buildObject: (properties: Array<ResolvedProperty<T>>) => T
    /**
     * Should create a reference to a type previously visited
     * @param type the identification for the type to reference
     */
    buildReference: (type: TypeIdentification) => T
    /**
     * Should create the structure corresponding to a indexable object like `{ [key: K]: V }
     * @param resolvedType The type V in the example above
     * @param kind The type K in the example above (can only be string or number)
     */
    buildIndexableObject: (resolvedType: T, kind: 'string' | 'number') => T
    /**
     * Called to end the resolution - in case you have steps that you want to perform when the type is completely
     * resolved. This is where we usually augment the type definition with the references (definitions)
     * @param resolvedType The type that was resolved
     */
    endResolution: (resolvedType: T, definitionsMap: Map<string, T>) => T
    /**
     * Called at the start of the resolution to help you clear any state that you might be keeping internaly
     */
    startResolution: () => void
}

export interface Options<T> extends Compiler.Options {
    module: Module<T>
    isProcessable?: (node: ts.Node) => boolean
    eagerReferences?: boolean
}

export function processFiles<T>(options: Options<T>): Array<[string, T, Map<string, T>?]> {
    const { program, checker } = Compiler.createProgram(options)

    const nodesOfInterest = program.getSourceFiles().reduce((nodes: ts.Node[], file) => {
        if (!options.filePaths.includes(file.fileName)) return nodes
        return nodes.concat(Compiler.getNodesToProcess(file, options.isProcessable))
    }, [])

    return nodesOfInterest.map(typeNode => {
        const fileName = typeNode.getSourceFile().fileName

        options.module.startResolution()
        const { type, references } = resolveTypeNode(typeNode, checker, options)

        return [fileName, options.module.endResolution(type, references), references]
    })
}

interface ResolvedTypeNode<T> {
    type: T
    references: Map<string, T>
}

function resolveTypeNode<T>(startNode: ts.Node, checker: ts.TypeChecker, options: Options<T>): ResolvedTypeNode<T> {
    /**
     * Returns the static declarations of a class - does not return the prototype
     */
    function getClassStaticDeclarations(symbol: ts.Symbol): ts.Symbol[] {
        const staticDeclarations: ts.Symbol[] = []
        // Getting TS error when using the spread operator on symbol.exports.values():
        // "Type must have a '[Symbol.iterator]()' method that returns an iterator"
        if (symbol.exports) symbol.exports.forEach(value => staticDeclarations.push(value))

        return staticDeclarations
    }

    function getIndexType(type: ts.Type): { kind: 'string' | 'number'; indexType: ts.Type } | null {
        const stringIndexType = type.getStringIndexType()
        if (stringIndexType) return { kind: 'string', indexType: stringIndexType }

        const numberIndexType = type.getNumberIndexType()
        if (numberIndexType) return { kind: 'number', indexType: numberIndexType }

        return null
    }

    // Keeps track of a portion of the resolution path in order to detect cycles
    const visited = new Set<number>()
    // Contains the types that are self referencing (that have a cycle)
    const selfReferencingTypes = new Set<number>()
    // Contains the resolved types that have a name in order to be able to reference them
    const references = new Map<string, T>()
    // Keeps tract of which named types were used in order to only add those to the returned references
    const referencesUsed = new Set<string>()

    const { module, eagerReferences } = options

    function recursion(type: ts.Type): T {
        const typeString = checker.typeToString(type)
        const typeId = Types.getTypeId(type)

        const identification: TypeIdentification = {
            id: typeId,
            name: typeString,
        }

        if (Types.isBigIntLiteral(type)) {
            return module.buildLiteral(type.value.negative ? `-${type.value.base10Value}` : type.value.base10Value)
        }
        if (Types.isLiteral(type)) {
            // When a literal type does not have a value it's a true or false literal
            if (type.value == null) {
                // True or false literals are not typed in the library but they have an intrinsic name
                return module.buildLiteral((type as any).intrinsicName === 'true')
            }
            return module.buildLiteral(type.value)
        }
        if (Types.isPrimitive(type)) return module.buildPrimitive(typeString as Primitive)
        if (Types.isArray(type)) return module.buildArray(recursion(checker.getTypeArguments(type)[0]))
        if (Types.isTuple(type)) return module.buildTuple(checker.getTypeArguments(type).map(recursion))
        if (Types.isEnum(type)) {
            const types = type.types.map(t => [t.symbol.escapedName, recursion(t)] as [string, T])
            return module.buildEnum(types)
        }
        if (Types.isDate(typeString)) return module.buildDate()
        if (Types.isObject(type)) {
            if (visited.has(typeId)) {
                // This means that there is a cycle (a self referencing type is being resolved)
                referencesUsed.add(identification.name)
                selfReferencingTypes.add(typeId)
                return module.buildReference(identification)
            }

            if (eagerReferences && typeStringIsTypeName(identification.name) && references.has(identification.name)) {
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            const indexType = getIndexType(type)
            // If we have a string index it's more permissive than anything else on the object and at the moment
            // I don't think it makes sense to take anything else there into account if that makes sense
            if (indexType) {
                // Index types could be self referencing so we add them to the visited array before recursing
                visited.add(typeId)
                const indexableType = recursion(indexType.indexType)
                visited.delete(typeId)

                const resolvedIndexable = module.buildIndexableObject(indexableType, indexType.kind)
                references.set(identification.name, resolvedIndexable)

                return resolvedIndexable
            }

            // For now abstract classes are parsed as normal classes

            // Exports are for static members in classes
            const staticProperties = getClassStaticDeclarations(type.symbol)
            const properties = checker.getPropertiesOfType(type).concat(staticProperties)
            const parentDeclarations = type.symbol.getDeclarations()

            // An "object" type should always have a declaration
            if (!parentDeclarations) return module.buildObject([])
            // Not sure if this will ever happen
            if (parentDeclarations.length === 0) return 'Not supported - declarations of length 0 for symbol' as any

            const resolvedProperties: Array<ResolvedProperty<T>> = []

            // We mark the current type as visited only once we know that it has children
            visited.add(typeId)

            properties.forEach(property => {
                if (Types.isPrototype(property)) return // Do not process prototypes
                // A property that is part of a class / type / interface should always have a declaration.
                if (!Types.hasDeclarations(property)) return 'Not supported - undefined property declarations' as any

                const propertyDeclaration = property.declarations[0]
                const propertyType = checker.getTypeOfSymbolAtLocation(property, propertyDeclaration)

                // Don't process functions
                if (Types.isObject(propertyType) && Types.isFunctionLike(propertyType)) return
                // Don't process get accessors
                if (Types.isGetAccessor(property)) return
                // Don't process private properties
                if (Types.hasModifier(propertyDeclaration, ts.SyntaxKind.PrivateKeyword)) return

                resolvedProperties.push({
                    isOptional: Types.isOptional(property),
                    maybeUndefined:
                        Types.isUnion(propertyType) && propertyType.types.some(part => Types.isUndefined(part)),
                    name: property.getName(),
                    resolvedType: recursion(propertyType),
                })
            })

            // Remove the object from visited once it's resolved
            visited.delete(typeId)

            const resolvedObject = module.buildObject(resolvedProperties)
            references.set(identification.name, resolvedObject)

            // If the type is self referencing, then even the first instance should be a reference to the definition
            // in order to avoid repetition
            if (selfReferencingTypes.has(typeId)) {
                return module.buildReference(identification)
            }

            if (eagerReferences && typeStringIsTypeName(identification.name)) {
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            return resolvedObject
        }
        if (Types.isGenericType(type)) return module.buildAny()
        if (Types.isUnion(type)) {
            // Filter undefined types as they don't impact unions
            const definedTypes = type.types.filter(Types.isDefined)

            if (Types.isUnionBoolean(definedTypes)) return module.buildPrimitive('boolean')

            if (eagerReferences && typeStringIsTypeName(identification.name) && references.has(identification.name)) {
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            const resolvedUnion = module.buildUnion(definedTypes.map(recursion))

            if (eagerReferences && typeStringIsTypeName(identification.name)) {
                references.set(identification.name, resolvedUnion)
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            return resolvedUnion
        }
        if (Types.isIntersection(type)) {
            if (eagerReferences && typeStringIsTypeName(identification.name) && references.has(identification.name)) {
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            const resolvedIntersection = module.buildIntersection(type.types.map(recursion))

            if (eagerReferences && typeStringIsTypeName(identification.name)) {
                references.set(identification.name, resolvedIntersection)
                referencesUsed.add(identification.name)
                return module.buildReference(identification)
            }

            return resolvedIntersection
        }

        return 'Not supported' as any
    }

    const resolvedType = recursion(checker.getTypeAtLocation(startNode))

    return {
        references: new Map([...references.entries()].filter(([name]) => referencesUsed.has(name))),
        type: resolvedType,
    }
}
