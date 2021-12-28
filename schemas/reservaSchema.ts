const reservaSchema = {
    querystring: {
        id_reserva: { type: 'string' },
    },
    response: {
        200: {
            type: 'array',
            properties: {
                dt_reserva: {type: "string"},
                id_obra: {type: "string"},
                dt_retiradaobra: {type: "string"},
                dt_devolucao: {type: "string"},
                id_leitor: {type: "string"},
                id_func: {type: "string"},
                id_reserva: {type: "string"},
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

const reservaBodySchema = {
    body: {
        type: 'object',
        properties: {
            dt_reserva: {type: "string"},
            id_obra: {type: "string"},
            dt_retiradaobra: {type: "string"},
            dt_devolucao: {type: "string"},
            id_leitor: {type: "string"},
            id_func: {type: "string"},
            id_reserva: {type: "string"},
        },
    },
    required: ["id_reserva"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const reservaUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            dt_reserva: {type: "string"},
            dt_retiradaobra: {type: "string"},
            dt_devolucao: {type: "string"},
            id_leitor: {type: "string"},
            id_func: {type: "string"},
            id_reserva: {type: "string"},
        },
    },
    querystring: {
        id_reserva: { type: 'string' },
    },
    required: ["id_reserva"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const reservaDeleteSchema = {
    querystring: {
        id_reserva: { type: 'string' },
    },
    required: ["id_reserva"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}


module.exports = { reservaSchema, reservaBodySchema, reservaUpdateSchema, reservaDeleteSchema };