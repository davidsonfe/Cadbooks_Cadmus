const catReaderBodySchema = {
  body: {
    type: 'object',
    properties: {
      cat_id: {type: "string"},
      desc_cat: {type: "string"},
      dias_limite: {type: "number"},
    },
  },
  required: ["cat_id"],
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
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    }
  }
};

const catReaderAllSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        cat_id: {type: "string"},
        desc_cat: {type: "string"},
        dias_limite: {type: "number"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    }
  }
};

const catReaderOneSchema = {
  params: {
    cat_id: {type:"string"}
  },
  required: ["cat_id"],
  response: {
    200: {
      type: 'array',
      properties: {
        cat_id: {type: "string"},
        desc_cat: {type: "string"},
        dias_limite: {type: "number"},
      },
    },
    400: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    }
  }
};

const catReaderUpDelSchema = {
  params: {
    cat_id: {type:"string"},
  },
  required: ["cat_id"],
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
    },
    404: {
      type: 'object',
      properties: {
        msg: {type: "string"},
      },
    }
  }
};

module.exports = {catReaderAllSchema, catReaderBodySchema, catReaderOneSchema, catReaderUpDelSchema};