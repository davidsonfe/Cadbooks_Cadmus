import {catLeitorModel} from "../models/catLeitorModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class catLeitorService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getCatLeitor(id: string) {
        try {
            if (this.collection) return await this.collection.find({cat_id: id}).project({_id:0}).toArray();
            return { msg: "Categoria de leitores não encontrada!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCatLeitores() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postCatLeitor(catLeitor: catLeitorModel) {
        try {
            if (this.collection) await this.collection.insertOne(catLeitor);
            return { msg: "Categoria de leitores cadastrada com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateCatLeitor(id: string, catLeitor: catLeitorModel) {
        try {
            if (this.collection) await this.collection.updateOne({cat_id: id}, {$set: {...catLeitor}});
            return { msg: "Categoria de leitores atualizada com sucesso!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteCatLeitor(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({cat_id: id});
            return { msg: "Categoria de leitores deletada com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}