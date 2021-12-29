import {DevolucaoModel} from "../models/devolucaoModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class DevolucaoService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getDevolucoes() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id: 0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getDevolucao(id: string) {
        try {
            if (this.collection) return await this.collection.find({id_obracop: id}).project({_id: 0}).toArray();
            return { msg: "devolução não encontrado!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postDevolucao(devolucao: DevolucaoModel) {
        try {
            if (this.collection) await this.collection.insertOne(devolucao);
            return { msg: "Devolucao cadastrado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateDevolucao(id: string, devolucao: DevolucaoModel) {
        try {
            if (this.collection) await this.collection.updateOne({id_obracop: id}, {$set: {...devolucao}});
            return { msg: "Devolucao atualizado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteDevolucao(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({id_obracop: id});
            return { msg: "Devolucao deletado com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
