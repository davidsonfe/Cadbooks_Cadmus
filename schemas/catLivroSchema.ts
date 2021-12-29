const catLivroSchema = {
    querystring: {
        cat_id: {type: 'string'}
    },
    response: {
        200: {
            type: 'array',
            properties: {
                descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"},
                taxa_diaria: {type: "number"}
            }
        },
        400: {
            type: 'object',
            properties: {
                msg: {type: "string"}
            }
        }
    }
}

const catLivroBodySchema = {
    body: {
        type: 'object',
        properties: {
            descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"},
                taxa_diaria: {type: "number"}
        }
    },
    required: ["cat_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

const catLivroUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"},
                taxa_diaria: {type: "number"}
        },
    },
    querystring: {
        cat_id: { type: 'string' },
    },
    required: ["cat_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

const catLivroDeleteSchema = {
    querystring: {
        cat_id: { type: 'string' },
    },
    required: ["cat_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

module.exports = { catLivroSchema, catLivroBodySchema, catLivroUpdateSchema, catLivroDeleteSchema };