const catBookBodySchema = {
  body: {
    type: 'object',
    properties: {
      cat_id: {type: "string"},
      desc_cat: {type: "string"},
      dias_limite: {type: "number"},
      multa: {type: "number"}
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

const catBookAllSchema = {
  response: {
    200: {
      type: 'array',
      properties: {
        cat_id: {type: "string"},
        desc_cat: {type: "string"},
        dias_limite: {type: "number"},
        multa: {type: "number"}
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

const catBookOneSchema = {
  required: ["cat_id"],
  response: {
    200: {
      type: 'array',
      properties: {
        cat_id: {type: "string"},
        desc_cat: {type: "string"},
        dias_limite: {type: "number"},
        multa: {type: "number"}
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

const catBookUpDelSchema = {
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

module.exports = {catBookBodySchema, catBookAllSchema, catBookOneSchema, catBookUpDelSchema};