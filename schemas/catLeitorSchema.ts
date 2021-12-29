const catLeitorSchema = {
    querystring: {
        cat_id: {type: 'string'}
    },
    response: {
        200: {
            type: 'array',
            properties: {
                descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"}
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

const catLeitorBodySchema = {
    body: {
        type: 'object',
        properties: {
            descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"}
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

const catLeitorUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            descricao: {type: "string"},
                cat_id: {type: "string"},
                dias_max: {type: "number"},
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

const catLeitorDeleteSchema = {
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

module.exports = { catLeitorSchema, catLeitorBodySchema, catLeitorUpdateSchema, catLeitorDeleteSchema };