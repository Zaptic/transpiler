// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: { name: { type: 'string' }, id: { type: 'string' } },
        required: ['name', 'id'],
        type: 'object',
    },
    {
        $ref: '#/definitions/Team',
        definitions: {
            Team: {
                additionalProperties: false,
                properties: {
                    users: {
                        type: 'array',
                        items: {
                            additionalProperties: false,
                            properties: { name: { type: 'string' }, id: { type: 'string' } },
                            required: ['name', 'id'],
                            type: 'object',
                        },
                    },
                    parent: { $ref: '#/definitions/Team' },
                },
                required: ['users'],
                type: 'object',
            },
        },
    },
    {
        additionalProperties: false,
        definitions: {
            OneLanguageTranslations: {},
        },
        patternProperties: {
            '.*': {
                anyOf: [
                    {
                        type: 'string',
                    },
                    {
                        $ref: '#/definitions/OneLanguageTranslations',
                    },
                ],
            },
        },
        properties: {},
        type: 'object',
    },
]

export const joi = [
    'const resolvedType = Joi.object({ name: Joi.string(),id: Joi.string() })',
    'const Team = Joi.object({ users: Joi.array().items(Joi.object({ name: Joi.string(),id: Joi.string() })).single(),parent: Joi.lazy(() => Team).optional() })\nconst resolvedType = Joi.lazy(() => Team)',
    'const OneLanguageTranslations = \nconst resolvedType = Joi.object().pattern(/.*/, Joi.alternatives([Joi.string(),Joi.lazy(() => OneLanguageTranslations)]))',
]
