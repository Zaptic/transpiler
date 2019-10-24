export const json = [
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
    { enum: [true] },
    { enum: [false] },
    { type: 'array', items: { type: 'string' } },
    { type: 'array', items: { type: 'number' } },
    { type: 'array', items: { type: 'boolean' } },
    { type: 'array', items: [{ type: 'string' }, { type: 'number' }, { type: 'boolean' }] },
    { anyOf: [{ enum: ['Red'] }, { enum: ['Green'] }, { enum: ['Blue'] }] },
]

export const joi = [
    'const resolvedType = Joi.any()',
    'const resolvedType = Joi.allow(undefined)',
    'const resolvedType = Joi.allow(null)',
    'const resolvedType = Joi.allow(undefined)',
    'const resolvedType = Joi.forbidden()',
    'const resolvedType = Joi.string()',
    'const resolvedType = Joi.number()',
    'const resolvedType = Joi.boolean()',
    'const resolvedType = Joi.equal(true)',
    'const resolvedType = Joi.equal(false)',
    'const resolvedType = Joi.array().items(Joi.string())',
    'const resolvedType = Joi.array().items(Joi.number())',
    'const resolvedType = Joi.array().items(Joi.boolean())',
    'const resolvedType = Joi.array().ordered([Joi.string(),Joi.number(),Joi.boolean()])',
    'const resolvedType = Joi.alternatives([Joi.equal("Red"),Joi.equal("Green"),Joi.equal("Blue")])',
]
