const devolutionBodySchema = {
  body: {
    type: 'object',
    properties: {
      isn_id_cop: {type: "string"},
      dt_devolucao: {type: "string"},
    },
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

module.exports = {devolutionBodySchema};