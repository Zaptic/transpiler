// tslint:disable
export default [
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
