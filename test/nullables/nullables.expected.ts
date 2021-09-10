// tslint:disable
export const json = [
    { anyOf: [{ type: 'null' }, {}] },
    {
        $ref: '#/definitions/NullableThing',
        definitions: { NullableThing: { anyOf: [{ type: 'null' }, { type: 'string' }] } },
    },
    { $ref: '#/definitions/UndefinableThing', definitions: { UndefinableThing: { type: 'string' } } },
    {
        $ref: '#/definitions/City',
        definitions: {
            NullableThing: { anyOf: [{ type: 'null' }, { type: 'string' }] },
            UndefinableThing: { type: 'string' },
            City: {
                additionalProperties: false,
                properties: {
                    continent: { $ref: '#/definitions/NullableThing' },
                    country: { $ref: '#/definitions/NullableThing' },
                    state: { $ref: '#/definitions/UndefinableThing' },
                    city: { $ref: '#/definitions/NullableThing' },
                    street: { type: 'string' },
                },
                required: ['continent', 'country', 'city', 'street'],
                type: 'object',
            },
        },
    },
]

export const joi = [
    'const resolvedType = Joi.alternatives([Joi.valid(null),Joi.any()])',
    'const NullableThing = Joi.alternatives([Joi.valid(null),Joi.string()])\nconst resolvedType = Joi.lazy(() => NullableThing)',
    'const UndefinableThing = Joi.string()\nconst resolvedType = Joi.lazy(() => UndefinableThing)',
    'const NullableThing = Joi.alternatives([Joi.valid(null),Joi.string()])\nconst UndefinableThing = Joi.string()\nconst City = Joi.object({ continent: Joi.lazy(() => NullableThing),country: Joi.lazy(() => NullableThing),state: Joi.lazy(() => UndefinableThing).optional(),city: Joi.lazy(() => NullableThing),street: Joi.string() })\nconst resolvedType = Joi.lazy(() => City)',
]
