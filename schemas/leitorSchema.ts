const leitorSchema = {
    response: {
        200: {
            type: 'array',
            properties: {
                nome: {type: "string"},
                email: {type: "string"},
                endereco: {type: "string"},
                cidade: {type: "string"},
                estado: {type: "string"},
                tel: {type: "string"},
                doc_id: {type: "string"},
            },
        },
    },
}

const leitorBodySchema = {
    body: {
        type: 'object',
        properties: {
            nome: {type: "string"},
            email: {type: "string"},
            endereco: {type: "string"},
            cidade: {type: "string"},
            estado: {type: "string"},
            tel: {type: "string"},
            doc_id: {type: "string"},
        },
    },
}

const leitorUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            nome: {type: "string"},
            email: {type: "string"},
            endereco: {type: "string"},
            cidade: {type: "string"},
            estado: {type: "string"},
            tel: {type: "string"},
            doc_id: {type: "string"},
        },
    },
    querystring: {
        doc_id: { type: 'string' },
    },
    required: ["doc_id"]
}

const leitorDeleteSchema = {
    querystring: {
        doc_id: { type: 'string' },
    },
    required: ["doc_id"]
}


module.exports = { leitorSchema, leitorBodySchema, leitorUpdateSchema, leitorDeleteSchema };