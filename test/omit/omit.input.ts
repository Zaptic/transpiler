// tslint:disable
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type UUID = string

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

interface ContentBase {
    id: UUID
    createdAt: Date
}

interface TextContent {
    contentType: 'text'
    text: string
}

interface FileContent {
    contentType: 'file'
    title: string
    url: string
}

type Content = ContentBase & (TextContent | FileContent)

interface AnnouncementBase {
    id: UUID
    name: string
    createAt: Date
    createBy: number
    isActive: boolean
    views: bigint
}

type Announcement = AnnouncementBase & Place
export type Target = Announcement & Omit<Content, 'id'>
