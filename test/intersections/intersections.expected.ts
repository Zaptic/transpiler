export default [
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, population: { type: 'string' } },
        required: ['city', 'population'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, street: { type: 'string' }, population: { type: 'number' } },
        required: ['street', 'population'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: { city: { type: 'string' }, population: { type: 'number' }, street: { type: 'string' } },
        required: ['city', 'population', 'street'],
        type: 'object',
    },
]
