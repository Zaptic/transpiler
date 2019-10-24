// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: {
            params: {},
            isValid: { type: 'boolean' },
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
        },
        required: ['params', 'req'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            params: {},
            isValid: { type: 'boolean' },
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
            'hyphenated-property': { type: 'number' },
        },
        required: ['params', 'hyphenated-property', 'req'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            params: {
                additionalProperties: false,
                properties: { id: { type: 'number' } },
                required: ['id'],
                type: 'object',
            },
            'hyphenated-property': {
                type: 'number',
            },
            isValid: { type: 'boolean' },
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
        },
        required: ['params', 'hyphenated-property', 'req'],
        type: 'object',
    },
]

export const joi = [
    'const resolvedType = Joi.object({ params: Joi.any(),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
    "const resolvedType = Joi.object({ params: Joi.any(),'hyphenated-property': Joi.number(),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })",
    "const resolvedType = Joi.object({ params: Joi.object({ id: Joi.number() }),'hyphenated-property': Joi.number(),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })",
]
