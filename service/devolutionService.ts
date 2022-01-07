import {DevolutionModel} from "../models/devolutionModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class DevolutionService {
  collection;
  collection2;

  constructor(fastify: FastifyInstance, collection: string, collection2: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
    }
  }

  async postDevolution(isn_id_cop: string, devolution: DevolutionModel) {
    try {
      if (this.collection && this.collection2) {
        const bk = await this.collection.find({isn_id: isn_id_cop}).project({_id: 0}).toArray();
        const brrow = (await this.collection2.find({isn_id_cop: isn_id_cop}).project({_id: 0}).toArray())[0].dt_devol;
        devolution.dt_devol = new Date();
        if (!bk[0].emprestado) {
          return 0;
        } else {
          const emprestado = false;
          const diff = Math.abs(devolution.dt_devol.getTime() - brrow.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if (days > bk[0].categoria.dias_limite) {
            const penalty = bk[0].categoria.multa * days;
            await this.collection.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}})
            return penalty;
          }
          await this.collection.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}})
          return 1;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}