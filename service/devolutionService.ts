import {DevolutionModel} from "../models/devolutionModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class DevolutionService {
  collection;
  collection2;
  collection3;

  constructor(fastify: FastifyInstance, collection: string, collection2: string, colletion3: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
      this.collection3 = fastify.mongo.db.collection(colletion3);
    }
  }

  async postDevolution(isn_id_cop: string, devolution: DevolutionModel) {
    try {
      if (this.collection && this.collection2 && this.collection3) {
        const bk = await this.collection2.find({isn_id: isn_id_cop}).project({_id: 0}).toArray();
        const brrow = await this.collection3.find({isn_id_cop: isn_id_cop}).project({_id: 0}).toArray();
        if (bk[0].emprestado) {
          const emprestado = false;
          devolution.dt_devol = new Date();
          const borrow_date = brrow.dt;
          const diff = Math.abs(devolution.dt_devol.getTime() - borrow_date.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if (days > brrow.categoria.dias_limite) {
            const penalty = bk[0].categoria.multa * days;
            await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}})
            const {acknowledged} = await this.collection.insertOne(devolution);
            return {acknowledged, penalty};
          }
          await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}})
          const {acknowledged} = await this.collection.insertOne(devolution);
          return { acknowledged, n:0};

        } else if (bk[0].reservado) {
          const reservado = false;
          devolution.dt_devol = new Date();
          const borrow_date = brrow.dt;
          const diff = Math.abs(devolution.dt_devol.getTime() - borrow_date.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if (days > brrow.categoria.dias_limite) {
            const penalty = bk[0].categoria.multa * days;
            await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {reservado}})
            const {acknowledged} = await this.collection.insertOne(devolution);
            return {acknowledged, penalty};
          }
          await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {reservado}})
          const {acknowledged} = await this.collection.insertOne(devolution);
          return { acknowledged, n:0};
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}