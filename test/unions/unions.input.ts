type BestProgrammingLanguage = 'js' | 'ts'

interface City {
    country?: string
    city: string
}

interface Street {
    country?: string
    city?: string
    street: string
}

type Place = City | Street
