// tslint:disable
export default [
    {
        additionalProperties: false,
        properties: {
            zeroValue: {},
            currentValue: {},
        },
        required: ['zeroValue', 'currentValue'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            zeroValue: { type: 'string' },
            currentValue: { type: 'string' },
        },
        required: ['zeroValue', 'currentValue'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            value: {
                additionalProperties: false,
                properties: {
                    zeroValue: { type: 'number' },
                    currentValue: { type: 'number' },
                },
                required: ['zeroValue', 'currentValue'],
                type: 'object',
            },
            type: { type: 'string' },
        },
        required: ['value', 'type'],
        type: 'object',
    },
]
