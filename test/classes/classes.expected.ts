// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: {
            name: {
                type: 'string',
            },
            speed: {
                type: 'number',
            },
        },
        required: ['name', 'speed'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            _barkCount: {
                type: 'number',
            },
            isDog: {
                type: 'boolean',
            },
            name: {
                type: 'string',
            },
            speed: {
                type: 'number',
            },
        },
        required: ['_barkCount', 'name', 'speed', 'isDog'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            name: {
                type: 'string',
            },
            speed: {
                type: 'number',
            },
        },
        required: ['name', 'speed'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            authors: {
                items: {
                    type: 'string',
                },
                type: 'array',
            },
        },
        required: ['authors'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            authors: {
                items: {
                    type: 'string',
                },
                type: 'array',
            },
            colors: {
                items: {
                    type: 'string',
                },
                type: 'array',
            },
        },
        required: ['colors', 'authors'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            x: {
                type: 'number',
            },
            y: {
                type: 'number',
            },
        },
        required: ['x', 'y'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            x: {
                type: 'number',
            },
            y: {
                type: 'number',
            },
            z: {
                type: 'number',
            },
        },
        required: ['z', 'x', 'y'],
        type: 'object',
    },
]

export const joi = [
    'const resolvedType = Joi.object({ name: Joi.string(),speed: Joi.number() })',
    'const resolvedType = Joi.object({ _barkCount: Joi.number(),name: Joi.string(),speed: Joi.number(),isDog: Joi.boolean() })',
    'const resolvedType = Joi.object({ name: Joi.string(),speed: Joi.number() })',
    'const resolvedType = Joi.object({ authors: Joi.array().items(Joi.string()).single() })',
    'const resolvedType = Joi.object({ colors: Joi.array().items(Joi.string()).single(),authors: Joi.array().items(Joi.string()).single() })',
    'const resolvedType = Joi.object({ x: Joi.number(),y: Joi.number() })',
    'const resolvedType = Joi.object({ z: Joi.number(),x: Joi.number(),y: Joi.number() })',
]
