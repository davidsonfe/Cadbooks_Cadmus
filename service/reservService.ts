import {ReservModel} from "../models/reservModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class ReservService {
  collection;
  collection2;

  constructor(fastify: FastifyInstance, collection: string, collection2: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
    }
  }

  async getReservs() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getReserv(id: string) {
    try {
      if (this.collection) {
        const reserv = await this.collection.find({isn_id_cop: id}).project({_id: 0}).toArray();
        if (Array.isArray(reserv) && reserv.length > 0)
          return reserv;
      }
    } catch (error) {
      throw error;
    }
  }

  async postReserv(reserva: ReservModel) {
    try {
      if (this.collection && this.collection2) {
        const limite = (await this.collection2.find({isn_id: reserva.isn_id_cop}).project({_id: 0}).toArray())[0].categoria.dias_limite;

        reserva.dt_ret = new Date();
        reserva.dt_devol = new Date();
        reserva.dt_reserva = new Date();

        const r = reserva.dt_reserva.getDate() + 3;
        reserva.dt_ret.setDate(r);
        const s = reserva.dt_ret.getDate() + limite;
        reserva.dt_devol.setDate(s);
        const reservado = true;
        await this.collection2.updateOne({isn_id: reserva.isn_id_cop}, {$set: {reservado}});
        const {acknowledged} = await this.collection.insertOne(reserva);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteReserv(id: string) {
    try {
      if (this.collection) {
        const reservado = false;
        await this.collection2.updateOne({isn_id: id}, {$set: {reservado}});
        const {acknowledged} = await this.collection.deleteOne({isn_id_cop: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}