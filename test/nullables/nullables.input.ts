type Nullable<T> = T | null

type NullableThing = string | null
type UndefinableThing = string | undefined

interface City {
    continent: string | null
    country: Nullable<string>
    state: UndefinableThing
    city: NullableThing
    street: string
    whyWouldYouDoThis: undefined
}
