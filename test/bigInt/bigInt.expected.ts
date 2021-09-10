// tslint:disable
export const json = [
    {
        $ref: '#/definitions/Target',
        definitions: {
            Target: {
                additionalProperties: false,
                properties: {
                    bigInt: { description: 'This is a bigint', type: 'number' },
                    literalBigInt: { enum: ['100'] },
                },
                required: ['bigInt', 'literalBigInt'],
                type: 'object',
            },
        },
    },
]

export const joi = [
    'const Target = Joi.object({ bigInt: Joi.string(),literalBigInt: Joi.equal("100") })\nconst resolvedType = Joi.lazy(() => Target)',
]
