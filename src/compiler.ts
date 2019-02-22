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
 * Recursive function that returns the nodes that represent "types" that we want to process (transpile)
 *
 * By default, what this function is after is finding all the nodes that potentially represent "types" and by "types"
 * I mean information about a data structure rather than type alias as defined by typescript.
 *
 * You can provide it your own function in order to narrow down what you're compiling
 */
export function getNodesToProcess(node: ts.Node, isProcessable = Types.isTranspilable): ts.Node[] {
    if (isProcessable(node)) {
        return [node]
    } else {
        const children: ts.Node[] = []

        node.forEachChild(child => {
            children.push(...getNodesToProcess(child, isProcessable))
        })

        return children
    }
}
