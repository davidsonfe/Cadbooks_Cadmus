const emprestimoSchema = {
    querystring: {
        dt_emprestimo: { type: 'string' },
    },
    response: {
        200: {
            type: 'array',
            properties: {
                id_emprestimo: {type: "string"},
                dt_emprestimo: {type: "string"},
                dt_devolucao: {type: "string"},
                id_leitor: {type: "string"},
                id_func: {type: "string"},
                id_obra: {type: "string"},
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

const emprestimoBodySchema = {
    body: {
        type: 'object',
        properties: {
            id_emprestimo: {type: "string"},
            dt_emprestimo: {type: "string"},
            dt_devolucao: {type: "string"},
            id_leitor: {type: "string"},
            id_func: {type: "string"},
            id_obra: {type: "string"},
        },
    },
    required: ["id_emprestimo"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}
const emprestimoUpdateSchema = {
    body: {
        type: 'object',
        properties: {
                id_emprestimo: {type: "string"},
                dt_emprestimo: {type: "string"},
                dt_devolucao: {type: "string"},
                id_leitor: {type: "string"},
                id_func: {type: "string"},
                id_obra: {type: "string"},
        },
    },
    querystring: {
        id_emprestimo: { type: 'string' },
    },
    required: ["id_emprestimo"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const emprestimoDeleteSchema = {
    querystring: {
        id_emprestimo: { type: 'string' },
    },
    required: ["id_emprestimo"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}


module.exports = { emprestimoSchema, emprestimoBodySchema, emprestimoUpdateSchema, emprestimoDeleteSchema };