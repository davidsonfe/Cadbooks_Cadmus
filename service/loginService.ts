import {FastifyInstance} from "fastify";
import "fastify-mongodb";


const bcrypt = require("bcrypt");
export class LoginService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async logIn(user: string, pass: string) {
        try {
            if (this.collection) {
                const us =  await this.collection.find({cpf: user}).project({_id:0}).toArray();
                if (typeof us !== "undefined" && us.length !== 0) {
                    return await bcrypt.compare(pass, us[0].passwd);
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}