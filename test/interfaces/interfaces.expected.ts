// tslint:disable
export default [
    {
        additionalProperties: false,
        properties: {
            params: {},
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
        },
        required: ['params', 'req'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            params: {},
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
        },
        required: ['params', 'req'],
        type: 'object',
    },
    {
        additionalProperties: false,
        properties: {
            params: {
                additionalProperties: false,
                properties: { id: { type: 'number' } },
                required: ['id'],
                type: 'object',
            },
            req: {
                additionalProperties: false,
                properties: {
                    body: {
                        additionalProperties: false,
                        patternProperties: { '.*': {} },
                        properties: {},
                        type: 'object',
                    },
                },
                required: ['body'],
                type: 'object',
            },
        },
        required: ['params', 'req'],
        type: 'object',
    },
]
