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
        const brrow = (await this.collection3.find({isn_id_cop: isn_id_cop}).project({_id: 0}).toArray())[0].dt_devol;
        devolution.dt_devol = new Date();
        if (!bk[0].emprestado) {
          return 0;
        } else {
          const diff = Math.abs(devolution.dt_devol.getTime() - brrow.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          const emprestado = false;
          if (days > bk[0].categoria.dias_limite) {
            const penalty = bk[0].categoria.multa * (days - 1);
            await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}});
            await this.collection2.deleteOne({isn_id_cop: isn_id_cop});
            return penalty;
          }
          await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}});
          await this.collection2.deleteOne({isn_id_cop: isn_id_cop});
          return 0;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}