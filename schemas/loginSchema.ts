const login = {
    headers: {
        type: 'object',
        properties: {
            "Access-Control-Allow-Origin": "*",
        }
    },
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
        }
    }
}

module.exports = {login}