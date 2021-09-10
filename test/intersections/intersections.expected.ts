// tslint:disable
export const json = [
    {
        $ref: '#/definitions/City',
        definitions: {
            City: {
                additionalProperties: false,
                properties: { city: { type: 'string' }, population: { type: 'string' } },
                required: ['city', 'population'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Street',
        definitions: {
            Street: {
                additionalProperties: false,
                properties: { city: { type: 'string' }, street: { type: 'string' }, population: { type: 'number' } },
                required: ['street', 'population'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Location',
        definitions: {
            City: {
                additionalProperties: false,
                properties: { city: { type: 'string' }, population: { type: 'string' } },
                required: ['city', 'population'],
                type: 'object',
            },
            Street: {
                additionalProperties: false,
                properties: { city: { type: 'string' }, street: { type: 'string' }, population: { type: 'number' } },
                required: ['street', 'population'],
                type: 'object',
            },
            Location: { allOf: [{ $ref: '#/definitions/City' }, { $ref: '#/definitions/Street' }] },
        },
    },
]

export const joi = [
    'const City = Joi.object({ city: Joi.string(),population: Joi.string() })\nconst resolvedType = Joi.lazy(() => City)',
    'const Street = Joi.object({ city: Joi.string().optional(),street: Joi.string(),population: Joi.number() })\nconst resolvedType = Joi.lazy(() => Street)',
    'const City = Joi.object({ city: Joi.string(),population: Joi.string() })\nconst Street = Joi.object({ city: Joi.string().optional(),street: Joi.string(),population: Joi.number() })\nconst Location = Joi.lazy(() => Joi.object().concat((City)).concat((Street)))\nconst resolvedType = Joi.lazy(() => Location)',
]
