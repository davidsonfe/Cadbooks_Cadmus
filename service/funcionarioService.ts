import {FuncionarioModel} from "../models/funcionarioModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class FuncionarioService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getFuncs() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFunc(id: string) {
        try {
            if (this.collection) return await this.collection.find({cpf: id}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postFunc(funcionario: FuncionarioModel) {
        try {
            if (this.collection) await this.collection.insertOne(funcionario);
            return {};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateFunc(id: string, funcionario: FuncionarioModel) {
        try {
            if (this.collection) await this.collection.updateOne({cpf: id}, {$set: {...funcionario}});
            return {};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteFunc(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({cpf: id});
            return {};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
