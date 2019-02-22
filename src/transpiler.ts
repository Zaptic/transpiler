import * as ts from 'typescript'
import * as Compiler from './compiler'
import * as Types from './types'

export interface ResolvedProperty<T> {
    isOptional: boolean
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

export interface Module<T> {
    buildAny: () => T
    buildDate: () => T
    buildPrimitive: (typeString: string) => T
    buildArray: (resolvedType: T) => T
    buildTuple: (resolvedTypes: T[]) => T
    buildUnion: (resolvedTypes: T[]) => T
    buildIntersection: (resolvedTypes: T[]) => T
    buildEnum: (resolvedTypes: Array<[string, T]>) => T
    buildLiteral: (literal: string | number | boolean | bigint) => T
    buildObject: (properties: Array<ResolvedProperty<T>>, type: TypeIdentification) => T
    buildReference: (type: TypeIdentification) => T
    buildIndexableObject: (resolvedType: T, kind: 'string' | 'number') => T
    endResolution: (resolvedType: T) => T
    startResolution: () => void
}

export interface Options<T> extends Compiler.Options {
    module: Module<T>
    isProcessable?: (node: ts.Node) => boolean
}

export function processFiles<T>(options: Options<T>): T[] {
    const { program, checker } = Compiler.createProgram(options)

    // For now let's just flatten the types, later we might want to keep the nesting in order to know what type came
    // from what file
    const nodesOfInterest = program.getSourceFiles().reduce((nodes: ts.Node[], file) => {
        if (!options.filePaths.includes(file.fileName)) return nodes
        return nodes.concat(Compiler.getNodesToProcess(file, options.isProcessable))
    }, [])

    return nodesOfInterest.map(typeNode => resolveTypeNode(typeNode, checker, options.module))
}

function resolveTypeNode<T>(startNode: ts.Node, checker: ts.TypeChecker, module: Module<T>): T {
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

    const visited = new Map<number, TypeIdentification>()

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
        if (Types.isLiteral(type)) return module.buildLiteral(type.value)
        if (Types.isPrimitive(type)) return module.buildPrimitive(typeString)
        if (Types.isArray(type)) return module.buildArray(recursion(type.typeArguments[0]))
        if (Types.isTuple(type)) return module.buildTuple(type.typeArguments.map(recursion))
        if (Types.isEnum(type)) {
            const types = type.types.map(t => [t.symbol.escapedName, recursion(t)] as [string, T])
            return module.buildEnum(types)
        }
        if (Types.isDate(typeString)) return module.buildDate()
        if (Types.isObject(type)) {
            if (visited.has(typeId)) return module.buildReference(identification)

            // We mark the current type as visited
            visited.set(typeId, identification)

            const indexType = getIndexType(type)
            // If we have a string index it's more permissive than anything else on the object and at the moment
            // I don't think it makes sense to take anything else there into account if that makes sense
            if (indexType) return module.buildIndexableObject(recursion(indexType.indexType), indexType.kind)

            // For now abstract classes are parsed as normal classes

            // Exports are for static members in classes
            const staticProperties = getClassStaticDeclarations(type.symbol)
            const properties = checker.getPropertiesOfType(type).concat(staticProperties)
            const parentDeclarations = type.symbol.getDeclarations()

            // An "object" type should always have a declaration
            if (!parentDeclarations) return 'Not supported - undefined declarations for symbol' as any
            if (parentDeclarations.length === 0) return 'Not supported - declarations of length 0 for symbol' as any

            const resolvedProperties: Array<ResolvedProperty<T>> = []

            properties.forEach(property => {
                if (Types.isPrototype(property)) return // Do not process prototypes
                // A property that is part of a class / type / interface should always have a declaration.
                if (!Types.hasDeclarations(property)) return 'Not supported - undefined property declarations' as any

                const propertyType = checker.getTypeOfSymbolAtLocation(property, parentDeclarations[0])
                const propertyDeclaration = property.declarations[0]

                // Don't process functions
                if (Types.isObject(propertyType) && Types.isFunctionLike(propertyType)) return
                // Don't process get accessors
                if (Types.isGetAccessor(property)) return
                // Don't process private properties
                if (Types.hasModifier(propertyDeclaration, ts.SyntaxKind.PrivateKeyword)) return

                resolvedProperties.push({
                    isOptional: Types.isOptional(property),
                    name: property.getName(),
                    resolvedType: recursion(propertyType),
                })
            })

            // Remove the object from visited once it's resolved
            visited.delete(typeId)
            return module.buildObject(resolvedProperties, identification)
        }
        if (Types.isGenericType(type)) return module.buildAny()
        if (Types.isUnion(type)) return module.buildUnion(type.types.map(recursion))
        if (Types.isIntersection(type)) return module.buildIntersection(type.types.map(recursion))

        return 'Not supported' as any
    }

    module.startResolution()
    const result = recursion(checker.getTypeAtLocation(startNode))
    return module.endResolution(result)
}
