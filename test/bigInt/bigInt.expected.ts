export const json = [
    {
        additionalProperties: false,
        properties: {
            bigInt: {
                description: 'This is a bigint',
                type: 'number',
            },
            literalBigInt: {
                enum: ['100'],
            },
        },
        required: ['bigInt', 'literalBigInt'],
        type: 'object',
    },
]

export const joi = ['const resolvedType = Joi.object({ bigInt: Joi.string(),literalBigInt: Joi.equal("100") })']
