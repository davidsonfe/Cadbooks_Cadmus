const reservSchema = {
  querystring: {
    isn_id_cop: {type: 'string'},
  },
  response: {
    200: {
      type: 'array',
      properties: {
        dt_reserva: {type: "string"},
        dt_ret: {type: "string"},
        dt_devol: {type: "string"},
        isn_id_cop: {type: "string"},
        doc_id: {type: "string"},
        cpf: {type: "string"},
        reservado: {type: "boolean"}
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
      dt_reserva: {type: "string"},
      dt_ret: {type: "string"},
      dt_devol: {type: "string"},
      isn_id_cop: {type: "string"},
      doc_id: {type: "string"},
      cpf: {type: "string"},
    },
  },
  required: ["isn_id_cop", "doc_id", "cpf"],
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
    isn_id_cop: {type: 'string'},
  },
  required: ["isn_id_cop"],
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

const reservReportSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        nome: {type: "string"},
        tel: {type: "string"},
        email: {type: "string"},
        titulo: {type: "string"},
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

module.exports = {reservSchema, reservBodySchema, reservDeleteSchema, reservReportSchema};