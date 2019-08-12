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
        },
        required: ['params', 'req'],
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
]

export const joi = [
    'const resolvedType = Joi.object({ params: Joi.any(),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
    'const resolvedType = Joi.object({ params: Joi.any(),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
    'const resolvedType = Joi.object({ params: Joi.object({ id: Joi.number() }),isValid: Joi.boolean().optional(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
]
