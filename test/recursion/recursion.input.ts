interface User {
    name: string
    id: string
}

interface Team {
    users: User[]
    parent?: Team
}

type OneLanguageTranslations = { [key: string]: string | OneLanguageTranslations }
