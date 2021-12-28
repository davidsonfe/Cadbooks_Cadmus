const livroSchema = {
    querystring: {
        isn_id: {type: 'string'}
    },
    response: {
        200: {
            type: 'array',
            properties: {
                titulo: {type: "string"},
                isn_id: {type: "string"},
                cat_livro: {type: "string"},
                autores: {type: "string"},
                palavras_chave: {type: "string"},
                data_public: {type: "string"}
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

const livroBodySchema = {
    body: {
        type: 'object',
        properties: {
            titulo: {type: "string"},
            isn_id: {type: "string"},
            cat_livro: {type: "string"},
            autores: {type: "array"},
            palavras_chave: {type: "array"},
            data_public: {type: "string"}
        }
    },
    required: ["isn_id", "cat_livro"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

const livroUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            titulo: {type: "string"},
            isn_id: {type: "string"},
            cat_livro: {type: "string"},
            autores: {type: "array"},
            palavras_chave: {type: "array"},
            data_public: {type: "string"}
        },
    },
    querystring: {
        isn_id: { type: 'string' },
    },
    required: ["isn_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

const livroDeleteSchema = {
    querystring: {
        isn_id: { type: 'string' },
    },
    required: ["isn_id"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        }
    }
}

module.exports = { livroSchema, livroBodySchema, livroUpdateSchema, livroDeleteSchema };