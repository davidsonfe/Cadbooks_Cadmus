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

module.exports = {catReaderBodySchema};