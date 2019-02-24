// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, population: { type: 'string' } },
        required: ['city', 'population'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, street: { type: 'string' }, population: { type: 'number' } },
        required: ['street', 'population'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, population: { type: 'number' }, street: { type: 'string' } },
        required: ['city', 'population', 'street'],
        type: 'object',
    },
]

export const joi = [
    'const resolvedType = Joi.object({ city: Joi.string(),population: Joi.string() })',
    'const resolvedType = Joi.object({ city: Joi.string().optional(),street: Joi.string(),population: Joi.number() })',
    'const resolvedType = Joi.object().keys(({ city: Joi.string(),population: Joi.string() })).keys(({ city: Joi.string().optional(),street: Joi.string(),population: Joi.number() }))',
]
