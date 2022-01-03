const bookSchema = {
  querystring: {
    isn_id: {type: 'string'}
  },
  response: {
    200: {
      type: 'array',
      properties: {
        isn_id: {type: "string"},
        titulo: {type: "string"},
        autores: {type: "string"},
        plv_chave: {type: "string"},
        editora: {type: "string"},
        num_pag: {type: "number"},
        num_ed: {type: "number"},
        dt_public: {type: "number"},
        emprestado: {type: "boolean"},
        reservado: {type: "boolean"},
        categoria: {type: "object"},
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"}
      }
    }
  }
};

const bookBodySchema = {
  body: {
    type: 'object',
    properties: {
      isn_id: {type: "string"},
      titulo: {type: "string"},
      autores: {type: "string"},
      plv_chave: {type: "string"},
      editora: {type: "string"},
      num_pag: {type: "number"},
      num_ed: {type: "number"},
      dt_public: {type: "number"},
      emprestado: {type: "boolean"},
      reservado: {type: "boolean"},
      categoria: {type: "object"},
    },
  },
  required: ["isn_id", "cat_livro"],
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
        msg: {type: "string"},
      },
    }
  }
};

const bookUpdateSchema = {
  body: {
    type: 'object',
    properties: {
      isn_id: {type: "string"},
      titulo: {type: "string"},
      autores: {type: "string"},
      plv_chave: {type: "string"},
      editora: {type: "string"},
      num_pag: {type: "number"},
      num_ed: {type: "number"},
      dt_public: {type: "number"},
      emprestado: {type: "boolean"},
      reservado: {type: "boolean"},
      categoria: {type: "object"},
    },
  },
  querystring: {
    isn_id: {type: 'string'},
  },
  required: ["isn_id"],
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
        msg: {type: "string"},
      },
    }
  }
};

const bookDeleteSchema = {
  querystring: {
    isn_id: {type: 'string'},
  },
  required: ["isn_id"],
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
        msg: {type: "string"},
      },
    }
  }
};

module.exports = {bookSchema, bookBodySchema, bookUpdateSchema, bookDeleteSchema};