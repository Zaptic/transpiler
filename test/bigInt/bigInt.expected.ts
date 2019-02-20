export default [
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
