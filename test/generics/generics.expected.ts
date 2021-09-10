// tslint:disable
export const json = [
    {
        additionalProperties: false,
        properties: { zeroValue: {}, currentValue: {} },
        required: ['zeroValue', 'currentValue'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { zeroValue: { type: 'string' }, currentValue: { type: 'string' } },
        required: ['zeroValue', 'currentValue'],
        type: 'object',
    },
    {
        $ref: '#/definitions/Result',
        definitions: {
            Result: {
                additionalProperties: false,
                properties: {
                    value: {
                        additionalProperties: false,
                        properties: { zeroValue: { type: 'number' }, currentValue: { type: 'number' } },
                        required: ['zeroValue', 'currentValue'],
                        type: 'object',
                    },
                    type: { type: 'string' },
                },
                required: ['value', 'type'],
                type: 'object',
            },
        },
    },
]

export const joi = [
    'const resolvedType = Joi.object({ zeroValue: Joi.any(),currentValue: Joi.any() })',
    'const resolvedType = Joi.object({ zeroValue: Joi.string(),currentValue: Joi.string() })',
    'const Result = Joi.object({ value: Joi.object({ zeroValue: Joi.number(),currentValue: Joi.number() }),type: Joi.string() })\nconst resolvedType = Joi.lazy(() => Result)',
]
