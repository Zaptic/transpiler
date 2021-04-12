// tslint:disable
export const json = [
    { anyOf: [{ type: 'null' }, {}] },
    { anyOf: [{ type: 'null' }, { type: 'string' }] },
    { type: 'string' },
    {
        additionalProperties: false,
        properties: {
            city: { anyOf: [{ type: 'null' }, { type: 'string' }] },
            continent: { anyOf: [{ type: 'null' }, { type: 'string' }] },
            country: { anyOf: [{ type: 'null' }, { type: 'string' }] },
            state: { type: 'string' },
            street: { type: 'string' },
        },
        required: ['continent', 'country', 'city', 'street'],
        type: 'object',
    },
]

export const joi = [
    'const resolvedType = Joi.alternatives([Joi.valid(null),Joi.any()])',
    'const resolvedType = Joi.alternatives([Joi.valid(null),Joi.string()])',
    'const resolvedType = Joi.string()',
    'const resolvedType = Joi.object({ continent: Joi.alternatives([Joi.valid(null),Joi.string()]),country: Joi.alternatives([Joi.valid(null),Joi.string()]),state: Joi.string().optional(),city: Joi.alternatives([Joi.valid(null),Joi.string()]),street: Joi.string() })',
]
