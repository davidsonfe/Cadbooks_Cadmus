const workersAllSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        nome: {type: "string"},
        endereco: {type: "string"},
        cidade: {type: "string"},
        estado: {type: "string"},
        tel: {type: "string"},
        dt_nasc: {type: "string"},
        cpf: {type: "string"},
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};

const workersSchema = {
  params: {
    cpf: {type: 'string'},
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
        dt_nasc: {type: "string"},
        cpf: {type: "string"},
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};

const workerBodySchema = {
  body: {
    type: 'object',
    properties: {
      nome: {type: "string"},
      endereco: {type: "string"},
      cidade: {type: "string"},
      estado: {type: "string"},
      tel: {type: "string"},
      dt_nasc: {type: "string"},
      cpf: {type: "string"},
      passwd: {type: "string"},
      admin: {type: "boolean"}
    },
    response: {
      200: {
        type: 'object',
        properties: {
          msg: {type: "string"},
        },
      },
      400: {
        type: 'object',
        properties: {
          msg: {type: "string"}
        },
      },
      404: {
        type: 'object',
        properties: {
          msg: {type: "string"}
        },
      },
    },
  },
};

const workerRegisterSchema = {
  body: {
    type: 'object',
    properties: {
      nome: {type: "string"},
      endereco: {type: "string"},
      cidade: {type: "string"},
      estado: {type: "string"},
      tel: {type: "string"},
      dt_nasc: {type: "string"},
      cpf: {type: "string"},
      passwd: {type: "string"}
    },
  },
  required: ["cpf"],
  response: {
    200: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};

const workerUpdateSchema = {
  body: {
    type: 'object',
    properties: {
      nome: {type: "string"},
      endereco: {type: "string"},
      cidade: {type: "string"},
      estado: {type: "string"},
      tel: {type: "string"},
      dt_nasc: {type: "string"},
      cpf: {type: "string"},
      passwd: {type: "string"}
    },
  },
  querystring: {
    cpf: {type: 'string'},
  },
  required: ["cpf"],
  response: {
    200: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};

const workerDeleteSchema = {
  querystring: {
    cpf: {type: 'string'},
  },
  params: {
    cpf: {type: 'string'},
  },
  required: ["cpf"],
  response: {
    200: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};


module.exports = {workersAllSchema, workersSchema, workerBodySchema, workerRegisterSchema, workerUpdateSchema, workerDeleteSchema};