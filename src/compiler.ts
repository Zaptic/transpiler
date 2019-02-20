import * as ts from 'typescript'
import * as Types from './types'

export interface Options {
    compiler?: ts.CompilerOptions
    filePaths: string[]
}

export function createProgram(options: Options) {
    if (!options.compiler) options.compiler = {}

    const program = ts.createProgram(options.filePaths, options.compiler)
    const checker = program.getTypeChecker()
    return { program, checker }
}

/**
 * Recursive function that returns the nodes that represent "types" that we can process (transpile)
 *
 * A "transpilable" node is a node that represents a bit of typescript. TS seems to be representing *everything* in a
 * file as a node whether it's a keyword, a variable name, a function, a type alias, ...
 *
 * What this function is after is finding all the nodes that potentially represent "types" and by "types" I mean
 * information about a data structure rather than type alias as defined by typescript.
 */
export function getTranspilableNodes(node: ts.Node): Types.TranspilableNode[] {
    if (Types.isTranspilable(node)) {
        return [node]
    } else {
        const children: Types.TranspilableNode[] = []

        node.forEachChild(child => {
            // TODO figure out why this happens
            // Strangely enough if this function returns forEachChild seems to behave differently than if it does not
            children.push(...getTranspilableNodes(child))
        })

        return children
    }
}
