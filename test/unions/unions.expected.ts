// tslint:disable
export const json = [
    {
        $ref: '#/definitions/BestProgrammingLanguage',
        definitions: { BestProgrammingLanguage: { anyOf: [{ enum: ['js'] }, { enum: ['ts'] }] } },
    },
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
]

export const joi = [
    'const BestProgrammingLanguage = Joi.alternatives([Joi.equal("js"),Joi.equal("ts")])\nconst resolvedType = Joi.lazy(() => BestProgrammingLanguage)',
    'const City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst resolvedType = Joi.lazy(() => City)',
    'const Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst resolvedType = Joi.lazy(() => Street)',
    'const City = Joi.object({ country: Joi.string().optional(),city: Joi.string() })\nconst Street = Joi.object({ country: Joi.string().optional(),city: Joi.string().optional(),street: Joi.string() })\nconst Place = Joi.alternatives([Joi.lazy(() => City),Joi.lazy(() => Street)])\nconst resolvedType = Joi.lazy(() => Place)',
]
