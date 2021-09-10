// tslint:disable
export const json = [
    {
        $ref: '#/definitions/User',
        definitions: {
            User: {
                additionalProperties: false,
                properties: { name: { type: 'string' }, id: { type: 'string' } },
                required: ['name', 'id'],
                type: 'object',
            },
        },
    },
    {
        $ref: '#/definitions/Team',
        definitions: {
            User: {
                additionalProperties: false,
                properties: { name: { type: 'string' }, id: { type: 'string' } },
                required: ['name', 'id'],
                type: 'object',
            },
            Team: {
                additionalProperties: false,
                properties: {
                    users: { type: 'array', items: { $ref: '#/definitions/User' } },
                    parent: { $ref: '#/definitions/Team' },
                },
                required: ['users'],
                type: 'object',
            },
        },
    },
    {
        additionalProperties: false,
        patternProperties: { '.*': { anyOf: [{ type: 'string' }, { $ref: '#/definitions/OneLanguageTranslations' }] } },
        properties: {},
        type: 'object',
        definitions: {
            OneLanguageTranslations: {
                additionalProperties: false,
                patternProperties: {
                    '.*': { anyOf: [{ type: 'string' }, { $ref: '#/definitions/OneLanguageTranslations' }] },
                },
                properties: {},
                type: 'object',
            },
        },
    },
]

export const joi = [
    'const User = Joi.object({ name: Joi.string(),id: Joi.string() })\nconst resolvedType = Joi.lazy(() => User)',
    'const User = Joi.object({ name: Joi.string(),id: Joi.string() })\nconst Team = Joi.object({ users: Joi.array().items(Joi.lazy(() => User)),parent: Joi.lazy(() => Team).optional() })\nconst resolvedType = Joi.lazy(() => Team)',
    'const OneLanguageTranslations = Joi.object().pattern(/.*/, Joi.alternatives([Joi.string(),Joi.lazy(() => OneLanguageTranslations)]))\nconst resolvedType = Joi.object().pattern(/.*/, Joi.alternatives([Joi.string(),Joi.lazy(() => OneLanguageTranslations)]))',
]
