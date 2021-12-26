const login = {
    body: {
        type: 'object',
        require: ['doc_id', 'passwd'],
        properties: {
            doc_id: {type: 'string'},
            passwd: {type: 'string'}
        },
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            require: ['token'],
            properties: {
                token: {type: 'string'}
            },
            additionalProperties: false
        }
    }
}

module.exports = {login}