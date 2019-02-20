import * as ts from 'typescript'

export type TranspilableNode = ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.EnumDeclaration

/**
 * A "transpilable" node is a node that contains information about a data structure which can be transpiled (converted)
 * into another construct that represents the same data structure
 */
export function isTranspilable(node: ts.Node): node is TranspilableNode {
    return (
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isClassDeclaration(node)
    )
}

interface LiteralBigInt extends ts.LiteralType {
    value: ts.PseudoBigInt
}

interface LiteralWithoutBigInt extends ts.LiteralType {
    value: string | number
}

/**
 * A literal type is a type that represents a literal value.
 *
 * Example:
 * In `type Foo = { bar: 10, baz: number }`, the type of `Foo['bar']` is the literal value `10`
 */
export function isLiteral(type: ts.Type): type is LiteralWithoutBigInt {
    const check =
        type.flags & ts.TypeFlags.StringLiteral ||
        type.flags & ts.TypeFlags.NumberLiteral ||
        type.flags & ts.TypeFlags.BooleanLiteral

    return Boolean(check)
}

export function isBigIntLiteral(type: ts.Type): type is LiteralBigInt {
    return Boolean(type.flags & ts.TypeFlags.BigIntLiteral)
}

/**
 * A primitive type is one of the base type constructs of typescript
 *
 * Example:
 * In `type Foo = { bar: 10, baz: number }`, the type of `Foo['baz']` is the `number` primitive
 */
export function isPrimitive(type: ts.Type) {
    const flags = type.flags

    const check =
        flags & ts.TypeFlags.Any ||
        flags & ts.TypeFlags.String ||
        flags & ts.TypeFlags.Number ||
        flags & ts.TypeFlags.BigInt ||
        flags & ts.TypeFlags.Boolean ||
        flags & ts.TypeFlags.Void ||
        flags & ts.TypeFlags.Undefined ||
        flags & ts.TypeFlags.Null ||
        flags & ts.TypeFlags.Never

    return Boolean(check)
}

/**
 * This is an approximation to determine if an "object" represents an anonymous function
 */
export function isAnonymousFunction(object: ts.ObjectType) {
    return Boolean(object.objectFlags & ts.ObjectFlags.Anonymous) && object.aliasTypeArguments === undefined
}

/**
 * I'm under the impression that object types are supposed to always have symbols
 */
export function isObject(type: ts.Type): type is ts.ObjectType & { symbol: ts.Symbol } {
    return Boolean(type.flags & ts.TypeFlags.Object)
}

/**
 * A Reference is a generic type that looks like Foo<T>.
 * At time of writing There is a nice comment about this in typescript.d.ts
 */
export function isReference(type: ts.ObjectType): type is ts.TypeReference {
    return Boolean(type.objectFlags & ts.ObjectFlags.Reference)
}

/**
 * Returns true if a type is an array
 * The only way to check that from a type seems to be to make sure it's a generic that is called 'Array'. This should
 * work as you're not normally able to override the Array type and if you do ... well ... too bad?
 *
 * We override the typeArguments type because it's not optional in case of an array or at least it should not be?
 * Also an array should only have 1 typeArgument
 */
export function isArray(type: ts.Type): type is ts.TypeReference & { typeArguments: [ts.Type] } {
    return isObject(type) && isReference(type) && Boolean(type.symbol && type.symbol.escapedName === 'Array')
}

/**
 * Similar to the array the tuple also has the tuple flag on it but has no symbol
 * In this case we override the typeArguments to make sure they are here and that they are an actual N-sized array
 */
export function isTuple(type: ts.Type): type is ts.TypeReference & { typeArguments: ts.Type[] } {
    return isObject(type) && isReference(type) && Boolean(type.target.objectFlags & ts.ObjectFlags.Tuple)
}

export function isEnum(type: ts.Type): type is EnumType {
    return Boolean(type.flags & ts.TypeFlags.EnumLiteral && type.flags & ts.TypeFlags.Union)
}

/**
 * It seems that enums are using the same `types` attributes used by ts.UnionOrIntersectionType to represent its members
 * so we're checking that it has the flags for both enum and union and casting as a ts.UnionOrIntersectionType. We also
 * know that it's a particular kind of ts.UnionOrIntersectionType that has only EnumLiteral & NumberLiteral that is what
 * the EnumType is defined as.
 *
 * The literal types have to have a symbol to represent the actual enum value so we also type that
 */
export interface EnumType extends ts.UnionOrIntersectionType {
    types: Array<ts.LiteralType & { value: number; symbol: ts.Symbol }>
}

export function isOptional(symbol: ts.Symbol) {
    return Boolean(symbol.flags & ts.SymbolFlags.Optional)
}

export function isPrototype(symbol: ts.Symbol) {
    return Boolean(symbol.flags & ts.SymbolFlags.Prototype)
}

export function hasDeclarations(symbol: ts.Symbol): symbol is ts.Symbol & { declarations: ts.Declaration[] } {
    return symbol.declarations !== undefined
}

export function isGetAccessor(symbol: ts.Symbol) {
    return Boolean(symbol.flags & ts.SymbolFlags.GetAccessor)
}

function hasModifiers(node: ts.Node): node is ts.Node & { modifiers: ts.ModifiersArray } {
    return Boolean(node.modifiers)
}

/**
 * Returns true if a node has a modifier of the given kind
 * This should be used to see if a node has a private keyword or such
 */
export function hasModifier(node: ts.Node, target: ts.SyntaxKind) {
    return hasModifiers(node) && node.modifiers.some(modifier => modifier.kind === target)
}

/**
 * Returns true if a type is actually a generic type "T"
 */
export function isGenericType(type: ts.Type): boolean {
    // We use TypeParameter as an approximation for a generic type, it might not be 100% accurate
    return Boolean(type.flags & ts.TypeFlags.TypeParameter)
}

export function isUnion(type: ts.Type): type is ts.UnionType {
    return Boolean(type.flags & ts.TypeFlags.Union)
}
