import {LeitorModel} from "../models/leitorModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class LeitorService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getLeitores() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLeitor(id: string) {
        try {
            if (this.collection) return await this.collection.find({doc_id: id}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postLeitor(leitor: LeitorModel) {
        try {
            if (this.collection) await this.collection.insertOne(leitor);
            return { msg: "Leitor cadastrado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateLeitor(id: string, leitor: LeitorModel) {
        try {
            if (this.collection) await this.collection.updateOne({doc_id: id}, {$set: {...leitor}});
            return { msg: "Leitor atualizado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteLeitor(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({doc_id: id});
            return { msg: "Leitor deletado com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
