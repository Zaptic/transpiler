export default [
    {},
    { type: 'undefined' },
    { type: 'null' },
    { type: 'undefined' },
    // I just decided to represent a never type like this for now we might want to parametrize this or change it to a
    // better representation
    { description: 'This is a never type', allOf: [{ type: 'string' }, { type: 'number' }] },
    { type: 'string' },
    { type: 'number' },
    { type: 'boolean' },
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
    { type: 'array', items: { type: 'boolean' } },
    { type: 'array', items: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
    { anyOf: [{ enum: ['Red'] }, { enum: ['Green'] }, { enum: ['Blue'] }] },
]
