// tslint:disable
export const json = [
    { additionalProperties: false, properties: {}, type: 'object' },
    { type: 'string' },
    {
        $ref: '#/definitions/City',
        definitions: {
            City: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Street',
        definitions: {
            Street: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Place',
        definitions: {
            City: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
            Street: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
            Place: { anyOf: [{ $ref: '#/definitions/City' }, { $ref: '#/definitions/Street' }] },
        },
    },
    {
        $ref: '#/definitions/ContentBase',
        definitions: {
            ContentBase: {
                additionalProperties: false,
                properties: { id: { type: 'string' }, createdAt: { description: 'This is a date', type: 'string' } },
                required: ['id', 'createdAt'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/TextContent',
        definitions: {
            TextContent: {
                additionalProperties: false,
                properties: { contentType: { enum: ['text'] }, text: { type: 'string' } },
                required: ['contentType', 'text'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/FileContent',
        definitions: {
            FileContent: {
                additionalProperties: false,
                properties: { contentType: { enum: ['file'] }, title: { type: 'string' }, url: { type: 'string' } },
                required: ['contentType', 'title', 'url'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Content',
        definitions: {
            ContentBase: {
                additionalProperties: false,
                properties: { id: { type: 'string' }, createdAt: { description: 'This is a date', type: 'string' } },
                required: ['id', 'createdAt'],
                type: 'object',
            },
            TextContent: {
                additionalProperties: false,
                properties: { contentType: { enum: ['text'] }, text: { type: 'string' } },
                required: ['contentType', 'text'],
                type: 'object',
            },
            FileContent: {
                additionalProperties: false,
                properties: { contentType: { enum: ['file'] }, title: { type: 'string' }, url: { type: 'string' } },
                required: ['contentType', 'title', 'url'],
                type: 'object',
            },
            Content: {
                anyOf: [
                    { allOf: [{ $ref: '#/definitions/ContentBase' }, { $ref: '#/definitions/TextContent' }] },
                    { allOf: [{ $ref: '#/definitions/ContentBase' }, { $ref: '#/definitions/FileContent' }] },
                ],
            },
        },
    },
    {
        $ref: '#/definitions/AnnouncementBase',
        definitions: {
            AnnouncementBase: {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                },
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Announcement',
        definitions: {
            AnnouncementBase: {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                },
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views'],
                type: 'object',
            },
            City: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
            Street: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
            Announcement: {
                anyOf: [
                    { allOf: [{ $ref: '#/definitions/AnnouncementBase' }, { $ref: '#/definitions/City' }] },
                    { allOf: [{ $ref: '#/definitions/AnnouncementBase' }, { $ref: '#/definitions/Street' }] },
                ],
            },
        },
    },
    {
        $ref: '#/definitions/Target',
        definitions: {
            AnnouncementBase: {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                },
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views'],
                type: 'object',
            },
            City: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
            Street: {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
            Target: {
                anyOf: [
                    {
                        allOf: [
                            { $ref: '#/definitions/AnnouncementBase' },
                            { $ref: '#/definitions/City' },
                            {
                                additionalProperties: false,
                                properties: {
                                    createdAt: { description: 'This is a date', type: 'string' },
                                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                                },
                                required: ['createdAt', 'contentType'],
                                type: 'object',
                            },
                        ],
                    },
                    {
                        allOf: [
                            { $ref: '#/definitions/AnnouncementBase' },
                            { $ref: '#/definitions/Street' },
                            {
                                additionalProperties: false,
                                properties: {
                                    createdAt: { description: 'This is a date', type: 'string' },
                                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                                },
                                required: ['createdAt', 'contentType'],
                                type: 'object',
                            },
                        ],
                    },
                ],
            },
        },
    },
]

export const joi = [
    'const resolvedType = Joi.object({  })',
    'const resolvedType = Joi.string()',
    'const City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst resolvedType = Joi.lazy(() => City)',
    'const Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst resolvedType = Joi.lazy(() => Street)',
    'const City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst Place = Joi.alternatives([Joi.lazy(() => City),Joi.lazy(() => Street)])\nconst resolvedType = Joi.lazy(() => Place)',
    'const ContentBase = Joi.object({ id: Joi.string(),createdAt: Joi.date() })\nconst resolvedType = Joi.lazy(() => ContentBase)',
    'const TextContent = Joi.object({ contentType: Joi.equal("text"),text: Joi.string() })\nconst resolvedType = Joi.lazy(() => TextContent)',
    'const FileContent = Joi.object({ contentType: Joi.equal("file"),title: Joi.string(),url: Joi.string() })\nconst resolvedType = Joi.lazy(() => FileContent)',
    'const ContentBase = Joi.object({ id: Joi.string(),createdAt: Joi.date() })\nconst TextContent = Joi.object({ contentType: Joi.equal("text"),text: Joi.string() })\nconst FileContent = Joi.object({ contentType: Joi.equal("file"),title: Joi.string(),url: Joi.string() })\nconst Content = Joi.alternatives([Joi.lazy(() => Joi.object().concat((ContentBase)).concat((TextContent))),Joi.lazy(() => Joi.object().concat((ContentBase)).concat((FileContent)))])\nconst resolvedType = Joi.lazy(() => Content)',
    'const AnnouncementBase = Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })\nconst resolvedType = Joi.lazy(() => AnnouncementBase)',
    'const AnnouncementBase = Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })\nconst City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst Announcement = Joi.alternatives([Joi.lazy(() => Joi.object().concat((AnnouncementBase)).concat((City))),Joi.lazy(() => Joi.object().concat((AnnouncementBase)).concat((Street)))])\nconst resolvedType = Joi.lazy(() => Announcement)',
    'const AnnouncementBase = Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })\nconst City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst Target = Joi.alternatives([Joi.lazy(() => Joi.object().concat((AnnouncementBase)).concat((City)).concat(Joi.object({ createdAt: Joi.date(),contentType: Joi.alternatives([Joi.equal("text"),Joi.equal("file")]) }))),Joi.lazy(() => Joi.object().concat((AnnouncementBase)).concat((Street)).concat(Joi.object({ createdAt: Joi.date(),contentType: Joi.alternatives([Joi.equal("text"),Joi.equal("file")]) })))])\nconst resolvedType = Joi.lazy(() => Target)',
]
