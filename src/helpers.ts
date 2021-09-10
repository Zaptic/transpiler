const typeNameRegex = /^[^|& <>"']+$/
/**
 * Checks that a string returned by `checker.typeToString(type)` is the identifier for a type
 * It's a bit naive and I would recommend using it sparingly
 * @param name
 */
export function typeStringIsTypeName(name: string) {
    return typeNameRegex.test(name)
}
