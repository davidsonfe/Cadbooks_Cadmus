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
        const reserv = await this.collection.find({id_reserva: id}).project({_id: 0}).toArray();
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
        const {acknowledged} = await this.collection.insertOne(reserva);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateReserv(id: string, reserva: ReservModel) {
    try {
      if (this.collection && this.collection2) {
        const lmt = (await this.collection2.find({isn_id: reserva.isn_id_cop}).project({_id: 0}).toArray())[0].categoria.dias_limite;

        reserva.dt_ret = new Date();
        reserva.dt_devol = new Date();
        reserva.dt_reserva = new Date();

        const d = reserva.dt_reserva.getDate() + 3;
        reserva.dt_ret.setDate(d);
        const c = reserva.dt_ret.getDate() + lmt;
        reserva.dt_devol.setDate(c);
        const {acknowledged} = await this.collection.updateOne({id_reserva: id}, {$set: {...reserva}});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteReserv(id: string) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.deleteOne({id_reserva: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}