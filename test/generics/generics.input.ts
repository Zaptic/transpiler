// See https://www.typescriptlang.org/docs/handbook/basic-types.html
// tslint:disable
type GenericNumber<T> = {
    zeroValue: T
    currentValue: T
}

type StringNumber = GenericNumber<string>

type Result = {
    value: GenericNumber<number>
    type: string
}
