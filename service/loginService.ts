import {FastifyInstance} from "fastify";
import "fastify-mongodb";
import {FuncionarioModel} from "../models/funcionarioModel";


export class LoginService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async logIn(user: string, pass: string) {
        try {
            if (this.collection) return await this.collection.findOne({cpf: user});
                return { msg: "Usuário ou senha incorretos!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}