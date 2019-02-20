import * as ts from 'typescript'

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
