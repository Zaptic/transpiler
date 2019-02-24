// tslint:disable
export const json = [
    { anyOf: [{ enum: ['js'] }, { enum: ['ts'] }] },
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
]

export const joi = [
    'const resolvedType = Joi.alternatives([Joi.equal("js"),Joi.equal("ts")])',
    'const resolvedType = Joi.object({ country: Joi.string().optional(),city: Joi.string() })',
    'const resolvedType = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })',
    'const resolvedType = Joi.alternatives([Joi.object({ country: Joi.string().optional(),city: Joi.string() }),Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })])',
]
