const devolutionBodySchema = {
  body: {
    type: 'object',
    properties: {
      isn_id_cop: {type: "string"},
      dt_devol: {type: "string"}
    },
  },
  required: ["isn_id_cop"],
  response: {
    200: {
      type: 'object',
      properties: {
        msg: {type: "number"}
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