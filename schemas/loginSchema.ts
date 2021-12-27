const login = {
    body: {
        type: 'object',
        require: ['cpf', 'passwd'],
        properties: {
            cpf: {type: 'string'},
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
        },
        400: {
            type: 'object',
            properties: {
                msg: {type: 'string'}
            },
            additionalProperties: false
        }
    }
}

module.exports = {login};