// tslint:disable
export default [
    {
        additionalProperties: false,
        properties: { name: { type: 'string' }, id: { type: 'string' } },
        required: ['name', 'id'],
        type: 'object',
    },
    {
        $ref: '#/definitions/Team',
        definitions: {
            Team: {
                additionalProperties: false,
                properties: {
                    users: {
                        type: 'array',
                        items: {
                            additionalProperties: false,
                            properties: { name: { type: 'string' }, id: { type: 'string' } },
                            required: ['name', 'id'],
                            type: 'object',
                        },
                    },
                    parent: { $ref: '#/definitions/Team' },
                },
                required: ['users'],
                type: 'object',
            },
        },
    },
]
