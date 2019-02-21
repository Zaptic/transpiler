// tslint:disable
export default [
    { additionalProperties: false, properties: {}, type: 'object' }, // omit type - bound to be useless here
    { type: 'string' }, // UUID type
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
        properties: {
            id: { type: 'string' },
            createdAt: { additionalProperties: false, properties: {}, type: 'object' },
        },
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
                    createdAt: { additionalProperties: false, properties: {}, type: 'object' },
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
                    createdAt: { additionalProperties: false, properties: {}, type: 'object' },
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
            createAt: { additionalProperties: false, properties: {}, type: 'object' },
            createBy: { type: 'number' },
            isActive: { type: 'boolean' },
            views: { description: 'This is a bigint', type: 'number' },
        },
        required: ['id', 'name', 'createAt', 'createBy', 'isActive', 'views'],
        type: 'object',
    },
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createAt: { additionalProperties: false, properties: {}, type: 'object' },
                    createBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'name', 'createAt', 'createBy', 'isActive', 'views', 'city'],
            },
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createAt: { additionalProperties: false, properties: {}, type: 'object' },
                    createBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    street: { type: 'string' },
                },
                type: 'object',
                required: ['id', 'name', 'createAt', 'createBy', 'isActive', 'views', 'street'],
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
                    createAt: { additionalProperties: false, properties: {}, type: 'object' },
                    createBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    createdAt: { additionalProperties: false, properties: {}, type: 'object' },
                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                },
                type: 'object',
                required: [
                    'id',
                    'name',
                    'createAt',
                    'createBy',
                    'isActive',
                    'views',
                    'city',
                    'createdAt',
                    'contentType',
                ],
            },
            {
                additionalProperties: false,
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    createAt: { additionalProperties: false, properties: {}, type: 'object' },
                    createBy: { type: 'number' },
                    isActive: { type: 'boolean' },
                    views: { description: 'This is a bigint', type: 'number' },
                    country: { type: 'string' },
                    city: { type: 'string' },
                    street: { type: 'string' },
                    createdAt: { additionalProperties: false, properties: {}, type: 'object' },
                    contentType: { anyOf: [{ enum: ['text'] }, { enum: ['file'] }] },
                },
                type: 'object',
                required: [
                    'id',
                    'name',
                    'createAt',
                    'createBy',
                    'isActive',
                    'views',
                    'street',
                    'createdAt',
                    'contentType',
                ],
            },
        ],
    },
]
