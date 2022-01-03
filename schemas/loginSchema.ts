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
      type: 'array',
      properties: {
        nome: {type: "string"},
        endereco: {type: "string"},
        cidade: {type: "string"},
        estado: {type: "string"},
        tel: {type: "string"},
        cpf: {type: "string"},
        token: {type: "string"},
      },
      additionalProperties: false
    },
    401: {
      type: 'object',
      properties: {
        msg: {type: 'string'}
      },
      additionalProperties: false
    }
  }
}

module.exports = {login};