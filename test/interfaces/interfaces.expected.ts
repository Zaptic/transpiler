// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: {
            params: {},
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
    'const resolvedType = Joi.object({ params: Joi.any(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
    'const resolvedType = Joi.object({ params: Joi.any(),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
    'const resolvedType = Joi.object({ params: Joi.object({ id: Joi.number() }),req: Joi.object({ body: Joi.object().pattern(/.*/, Joi.any()) }) })',
]
