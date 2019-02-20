export default [
    { anyOf: [{ enum: ['js'] }, { enum: ['ts'] }] },
    {
        additionalProperties: false,
        properties: { country: { type: 'string' }, city: { type: 'string' } },
        required: ['city'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
        required: ['street'],
        type: 'object',
    },
    {
        anyOf: [
            {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' } },
                required: ['city'],
                type: 'object',
            },
            {
                additionalProperties: false,
                properties: { country: { type: 'string' }, city: { type: 'string' }, street: { type: 'string' } },
                required: ['street'],
                type: 'object',
            },
        ],
    },
]
