const readersAllSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        nome: {type: "string"},
        endereco: {type: "string"},
        cidade: {type: "string"},
        estado: {type: "string"},
        tel: {type: "string"},
        email: {type: "string"},
        doc_id: {type: "string"},
        dt_nasc: {type: "string"},
        categoria: {type: "object"}
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      }
    }
  },
}

const readersSchema = {
  querystring: {
    doc_id: {type: 'string'},
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
        email: {type: "string"},
        doc_id: {type: "string"},
        dt_nasc: {type: "string"},
        categoria: {type: "object"}
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      }
    }
  },
}

const readerBodySchema = {
  body: {
    type: 'object',
    properties: {
      nome: {type: "string"},
      endereco: {type: "string"},
      cidade: {type: "string"},
      estado: {type: "string"},
      tel: {type: "string"},
      email: {type: "string"},
      doc_id: {type: "string"},
      dt_nasc: {type: "string"},
      categoria: {type: "object"},
    },
  },
  required: ["doc_id", "categoria"],
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
      }
    },
  },
}

const readerUpdateSchema = {
  body: {
    type: 'object',
    properties: {
      nome: {type: "string"},
      endereco: {type: "string"},
      cidade: {type: "string"},
      estado: {type: "string"},
      tel: {type: "string"},
      email: {type: "string"},
      doc_id: {type: "string"},
      dt_nasc: {type: "string"},
      categoria: {type: "object"},
    },
  },
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
      }
    },
  },
}

const readerDeleteSchema = {
  querystring: {
    doc_id: {type: 'string'},
  },
  params: {
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
      }
    },
  },
}

module.exports = {readersAllSchema, readersSchema, readerBodySchema, readerUpdateSchema, readerDeleteSchema};