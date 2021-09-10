// tslint:disable
export const json = [
    {
        $ref: '#/definitions/Animal',
        definitions: {
            Animal: {
                additionalProperties: false,
                properties: { name: { type: 'string' }, speed: { type: 'number' } },
                required: ['name', 'speed'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Dog',
        definitions: {
            Dog: {
                additionalProperties: false,
                properties: {
                    _barkCount: { type: 'number' },
                    name: { type: 'string' },
                    speed: { type: 'number' },
                    isDog: { type: 'boolean' },
                },
                required: ['_barkCount', 'name', 'speed', 'isDog'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Cat',
        definitions: {
            Cat: {
                additionalProperties: false,
                properties: { name: { type: 'string' }, speed: { type: 'number' } },
                required: ['name', 'speed'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Art',
        definitions: {
            Art: {
                additionalProperties: false,
                properties: { authors: { type: 'array', items: { type: 'string' } } },
                required: ['authors'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Painting',
        definitions: {
            Painting: {
                additionalProperties: false,
                properties: {
                    colors: { type: 'array', items: { type: 'string' } },
                    authors: { type: 'array', items: { type: 'string' } },
                },
                required: ['colors', 'authors'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Point',
        definitions: {
            Point: {
                additionalProperties: false,
                properties: { x: { type: 'number' }, y: { type: 'number' } },
                required: ['x', 'y'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Point3d',
        definitions: {
            Point3d: {
                additionalProperties: false,
                properties: { z: { type: 'number' }, x: { type: 'number' }, y: { type: 'number' } },
                required: ['z', 'x', 'y'],
                type: 'object',
            },
        },
    },
]

export const joi = [
    'const Animal = Joi.object({ name: Joi.string(),speed: Joi.number() })\nconst resolvedType = Joi.lazy(() => Animal)',
    'const Dog = Joi.object({ _barkCount: Joi.number(),name: Joi.string(),speed: Joi.number(),isDog: Joi.boolean() })\nconst resolvedType = Joi.lazy(() => Dog)',
    'const Cat = Joi.object({ name: Joi.string(),speed: Joi.number() })\nconst resolvedType = Joi.lazy(() => Cat)',
    'const Art = Joi.object({ authors: Joi.array().items(Joi.string()) })\nconst resolvedType = Joi.lazy(() => Art)',
    'const Painting = Joi.object({ colors: Joi.array().items(Joi.string()),authors: Joi.array().items(Joi.string()) })\nconst resolvedType = Joi.lazy(() => Painting)',
    'const Point = Joi.object({ x: Joi.number(),y: Joi.number() })\nconst resolvedType = Joi.lazy(() => Point)',
    'const Point3d = Joi.object({ z: Joi.number(),x: Joi.number(),y: Joi.number() })\nconst resolvedType = Joi.lazy(() => Point3d)',
]
