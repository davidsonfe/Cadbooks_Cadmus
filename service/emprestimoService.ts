import {EmprestimoModel} from "../models/emprestimoModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class EmprestimoService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getEmprestimos() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id:0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getEmprestimo(id: string) {
        try {
            if (this.collection) return await this.collection.find({id_emprestimo: id}).project({_id:0}).toArray();
            return { msg: "Emprestimo não encontrado!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postEmprestimo(Emprestimo: EmprestimoModel) {
        try {
            if (this.collection) await this.collection.insertOne(Emprestimo);
            return { msg: "Emprestimo cadastrado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateEmprestimo(id: string, Emprestimo: EmprestimoModel) {
        try {
            if (this.collection) await this.collection.updateOne({id_emprestimo: id}, {$set: {...Emprestimo}});
            return { msg: "Emprestimo atualizado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteEmprestimo(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({id_emprestimo: id});
            return { msg: "Emprestimo deletado com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
