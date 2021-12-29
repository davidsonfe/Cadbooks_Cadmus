const devolucaoSchema = {
    querystring: {
        id_obracop: { type: 'string' },
    },
    response: {
        200: {
            type: 'array',
            properties: {
                id_obracop: {type: "string"},
                dt_devolucao: {type: "string"},
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

const devolucaoBodySchema = {
    body: {
        type: 'object',
        properties: {
            id_obracop: {type: "string"},
            dt_devolucao: {type: "string"},
        },
    },
    required: ["id_obracop"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}
const devolucaoUpdateSchema = {
    body: {
        type: 'object',
        properties: {
                id_obracop: {type: "string"},
                dt_devolucao: {type: "string"},
        },
    },
    querystring: {
        id_obracop: { type: 'string' },
    },
    required: ["id_obracop"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const devolucaoDeleteSchema = {
    querystring: {
        id_obracop: { type: 'string' },
    },
    required: ["id_obracop"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}


module.exports = { devolucaoSchema, devolucaoBodySchema, devolucaoUpdateSchema, devolucaoDeleteSchema };