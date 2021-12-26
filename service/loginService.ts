import {FastifyInstance} from "fastify";
import "fastify-mongodb";


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
                return await this.collection.findOne({doc_id: user, passwd: pass});
            }
            return{};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
