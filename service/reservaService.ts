import {ReservaModel} from "../models/reservaModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class ReservaService {
    collection;

    constructor(fastify: FastifyInstance, collection: string) {
        if (fastify.mongo.db) {
            this.collection = fastify.mongo.db.collection(collection);
        }
    }

    async getReservas() {
        try {
            if (this.collection) return await this.collection.find({}).project({_id: 0}).toArray();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getReserva(id: string) {
        try {
            if (this.collection) return await this.collection.find({id_reserva: id}).project({_id: 0}).toArray();
            return { msg: "Funcionário não encontrado!" };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async postReserva(reserva: ReservaModel) {
        try {
            if (this.collection) await this.collection.insertOne(reserva);
            return { msg: "reserva cadastrado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateReserva(id: string, reserva: ReservaModel) {
        try {
            if (this.collection) await this.collection.updateOne({id_reserva: id}, {$set: {...reserva}});
            return { msg: "reserva atualizado com sucesso!"};
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteReserva(id: string) {
        try {
            if (this.collection) await this.collection.deleteOne({id_reserva: id});
            return { msg: "reserva deletado com sucesso!"};
        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}
