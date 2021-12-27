const funcsSchema = {
    response: {
        200: {
            type: 'array',
            properties: {
                nome: {type: "string"},
                endereco: {type: "string"},
                cidade: {type: "string"},
                estado: {type: "string"},
                tel: {type: "string"},
                dt_nasc: {type: "string"},
                cpf: {type: "string"},
            },
        },
    },
};

const funcBodySchema = {
    body: {
        type: 'object',
        properties: {
            nome: {type: "string"},
            endereco: {type: "string"},
            cidade: {type: "string"},
            estado: {type: "string"},
            tel: {type: "string"},
            dt_nasc: {type: "string"},
            cpf: {type: "string"},
            passwd: {type: "string"}
        },
    },
};

const funcRegisterSchema = {
    body: {
        type: 'object',
        properties: {
            nome: {type: "string"},
            endereco: {type: "string"},
            cidade: {type: "string"},
            estado: {type: "string"},
            tel: {type: "string"},
            dt_nasc: {type: "string"},
            cpf: {type: "string"},
            passwd: {type: "string"}
        },
    },
    required: ["cpf"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
};

const funcUpdateSchema = {
    body: {
        type: 'object',
        properties: {
            nome: {type: "string"},
            endereco: {type: "string"},
            cidade: {type: "string"},
            estado: {type: "string"},
            tel: {type: "string"},
            dt_nasc: {type: "string"},
            cpf: {type: "string"},
            passwd: {type: "string"}
        },
    },
    querystring: {
        cpf: { type: 'string' },
    },
    required: ["cpf"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
};

const funcDeleteSchema = {
    querystring: {
        cpf: { type: 'string' },
    },
    required: ["cpf"],
    response: {
        200: {
            type: 'object',
            properties: {
                msg: {type: "string"},
            },
        },
    }
};


module.exports = { funcsSchema, funcBodySchema, funcRegisterSchema, funcUpdateSchema, funcDeleteSchema};