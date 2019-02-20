interface City {
    city: string
    population: string
}

interface Street {
    city?: string
    street: string
    population: number
}

type Location = City & Street
