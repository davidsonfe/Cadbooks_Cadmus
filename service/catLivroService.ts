import {catLivroModel} from "../models/catLivroModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class catLivroService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getCatLivro(id: string) {
        try {
            if (this.collection) return await this.collection.find({cat_id: id}).project({_id:0}).toArray();
            return { msg: "Categoria de livros não encontrada!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCatLivros() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postCatLivro(catLivro: catLivroModel) {
        try {
            if (this.collection) await this.collection.insertOne(catLivro);
            return { msg: "Categoria de livros cadastrada com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateCatLivro(id: string, catLivro: catLivroModel) {
        try {
            if (this.collection) await this.collection.updateOne({cat_id: id}, {$set: {...catLivro}});
            return { msg: "Categoria de livros atualizada com sucesso!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteCatLivro(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({cat_id: id});
            return { msg: "Categoria de livros deletada com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}