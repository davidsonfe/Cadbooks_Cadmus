const borrowSchema = {
  querystring: {
    doc_id: {type: 'string'},
  },
  response: {
    200: {
      type: 'array',
      properties: {
        dt_empr: {type: "string"},
        dt_devol: {type: "string"},
        doc_id: {type: "string"},
        cpf: {type: "string"},
        isn_id_cop: {type: "string"},
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

const borrowBodySchema = {
  body: {
    type: 'object',
    properties: {
      dt_empr: {type: "string"},
      doc_id: {type: "string"},
      cpf: {type: "string"},
      isn_id_cop: {type: "string"},
    },
  },
  required: ["doc_id", "cpf", "isn_id_cop"],
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

const borrowDeleteSchema = {
  querystring: {
    doc_id: {type: 'string'},
  },
  required: ["doc_id"],
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

const borrowReportSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        dt_empr: {type: "string"},
        dt_devol: {type: "string"},
        nome: {type: "string"},
        titulo: {type: "string"},
        categoria: {type: "string"},
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




module.exports = {borrowSchema, borrowBodySchema, borrowDeleteSchema, borrowReportSchema};