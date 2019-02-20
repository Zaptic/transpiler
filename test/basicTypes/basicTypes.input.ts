// See https://www.typescriptlang.org/docs/handbook/basic-types.html

type Any = any
type Void = void
type Null = null
type Undefined = undefined
type Never = never

type PrimitiveString = string
type PrimitiveNumber = number
type PrimitiveBoolean = boolean

type ArrayString = string[]
type ArrayNumber = number[]
type ArrayBoolean = boolean[]

type Tuple = [string, number, boolean]

enum Enum {
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
}
