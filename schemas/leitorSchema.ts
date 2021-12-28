const leitorSchema = {
    querystring: {
        doc_id: { type: 'string' },
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
                cat_leitor: {type: "string"},
                dt_nasc: {type: "string"}
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

const leitorBodySchema = {
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
            cat_leitor: {type: "string"},
            dt_nasc: {type: "string"}
        },
    },
    required: ["doc_id", "cat_leitor"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const leitorUpdateSchema = {
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
            cat_leitor: {type: "string"},
            dt_nasc: {type: "string"}
        },
    },
    querystring: {
        doc_id: { type: 'string' },
    },
    required: ["doc_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}

const leitorDeleteSchema = {
    querystring: {
        doc_id: { type: 'string' },
    },
    required: ["doc_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
}


module.exports = { leitorSchema, leitorBodySchema, leitorUpdateSchema, leitorDeleteSchema };