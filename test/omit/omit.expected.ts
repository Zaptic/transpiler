// tslint:disable
export const json = [
    { additionalProperties: false, properties: {}, type: 'object' },
    { type: 'string' },
    {
        additionalProperties: false,
        properties: { country: { type: 'string' }, city: { type: 'string' } },
        required: ['city'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
        required: ['street'],
        type: 'object',
    },
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
            {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
        ],
    },
    {
        additionalProperties: false,
        properties: { id: { type: 'string' }, createdAt: { description: 'This is a date', type: 'string' } },
        required: ['id', 'createdAt'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { contentType: { enum: ['text'] }, text: { type: 'string' } },
        required: ['contentType', 'text'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { contentType: { enum: ['file'] }, title: { type: 'string' }, url: { type: 'string' } },
        required: ['contentType', 'title', 'url'],
        type: 'object',
    },
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    contentType: { enum: ['text'] },
                    text: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'createdAt', 'contentType', 'text'],
            },
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    contentType: { enum: ['file'] },
                    title: { type: 'string' },
                    url: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'createdAt', 'contentType', 'title', 'url'],
            },
        ],
    },
    {
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
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views', 'city'],
            },
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    street: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views', 'street'],
            },
        ],
    },
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                },
                type: 'object',
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views', 'city', 'contentType'],
            },
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createdAt: { description: 'This is a date', type: 'string' },
                    createdBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    street: { type: 'string' },
                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                },
                type: 'object',
                required: ['id', 'name', 'createdAt', 'createdBy', 'isActive', 'views', 'street', 'contentType'],
            },
        ],
    },
]

export const joi = [
    'const resolvedType = Joi.object({  })',
    'const resolvedType = Joi.string()',
    'const resolvedType = Joi.object({ country: Joi.string().optional(),city: Joi.string() })',
    'const resolvedType = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })',
    'const resolvedType = Joi.alternatives([Joi.object({ country: Joi.string().optional(),city: Joi.string() }),Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })])',
    'const resolvedType = Joi.object({ id: Joi.string(),createdAt: Joi.date() })',
    'const resolvedType = Joi.object({ contentType: Joi.equal("text"),text: Joi.string() })',
    'const resolvedType = Joi.object({ contentType: Joi.equal("file"),title: Joi.string(),url: Joi.string() })',
    'const resolvedType = Joi.alternatives([Joi.object().concat(Joi.object({ id: Joi.string(),createdAt: Joi.date() })).concat(Joi.object({ contentType: Joi.equal("text"),text: Joi.string() })),Joi.object().concat(Joi.object({ id: Joi.string(),createdAt: Joi.date() })).concat(Joi.object({ contentType: Joi.equal("file"),title: Joi.string(),url: Joi.string() }))])',
    'const resolvedType = Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })',
    'const resolvedType = Joi.alternatives([Joi.object().concat(Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })).concat(Joi.object({ country: Joi.string().optional(),city: Joi.string() })),Joi.object().concat(Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })).concat(Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() }))])',
    'const resolvedType = Joi.alternatives([Joi.object().concat(Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })).concat(Joi.object({ country: Joi.string().optional(),city: Joi.string() })).concat(Joi.object({ createdAt: Joi.date(),contentType: Joi.alternatives([Joi.equal("text"),Joi.equal("file")]) })),Joi.object().concat(Joi.object({ id: Joi.string(),name: Joi.string(),createdAt: Joi.date(),createdBy: Joi.number(),isActive: Joi.boolean(),views: Joi.string() })).concat(Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })).concat(Joi.object({ createdAt: Joi.date(),contentType: Joi.alternatives([Joi.equal("text"),Joi.equal("file")]) }))])',
]
