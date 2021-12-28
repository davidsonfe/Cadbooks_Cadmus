import {LivroModel} from "../models/livroModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class LivroService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getLivro(id: string) {
        try {
            if (this.collection) return await this.collection.find({isn_id: id}).project({_id:0}).toArray();
            return { msg: "Livro não encontrado!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getLivros() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postLivro(livro: LivroModel) {
        try {
            if (this.collection) await this.collection.insertOne(livro);
            return { msg: "Livro cadastrado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateLivro(id: string, livro: LivroModel) {
        try {
            if (this.collection) await this.collection.updateOne({isn_id: id}, {$set: {...livro}});
            return { msg: "Livro atualizado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteLivro(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({isn_id: id});
            return { msg: "Livro deletado com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}