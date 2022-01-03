const reservSchema = {
  querystring: {
    id_reserva: {type: 'string'},
  },
  response: {
    200: {
      type: 'array',
      properties: {
        id_reserva: {type: "string"},
        dt_reserva: {type: "string"},
        dt_ret: {type: "string"},
        dt_devol: {type: "string"},
        isn_id_cop: {type: "string"},
        doc_id: {type: "string"},
        cpf: {type: "string"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      }
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      },
    },
  },
};

const reservBodySchema = {
  body: {
    type: 'object',
    properties: {
      id_reserva: {type: "string"},
      dt_reserva: {type: "string"},
      dt_ret: {type: "string"},
      dt_devol: {type: "string"},
      isn_id_cop: {type: "string"},
      doc_id: {type: "string"},
      cpf: {type: "string"},
    },
  },
  required: ["id_reserva", "id_obra", "doc_id", "cpf"],
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

const reservUpdateSchema = {
  body: {
    type: 'object',
    properties: {
      id_reserva: {type: "string"},
      dt_reserva: {type: "string"},
      dt_ret: {type: "string"},
      dt_devol: {type: "string"},
      isn_id_cop: {type: "string"},
      doc_id: {type: "string"},
      cpf: {type: "string"},
    },
  },
  querystring: {
    id_reserva: {type: 'string'},
  },
  required: ["id_reserva"],
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

const reservDeleteSchema = {
  querystring: {
    id_reserva: {type: 'string'},
  },
  required: ["id_reserva"],
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

module.exports = {reservSchema, reservBodySchema, reservUpdateSchema, reservDeleteSchema};