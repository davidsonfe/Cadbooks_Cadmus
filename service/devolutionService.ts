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
        const bk = await this.collection2.find({isn_id: isn_id_cop}).project({_id: 0}).toArray();
        if (bk[0].emprestado) {
          const emprestado = false;
          await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {emprestado}});
          const {acknowledged} = await this.collection.insertOne(devolution);
          return acknowledged;
        } else if (bk[0].reservado) {
          const reservado = false;
          await this.collection2.updateOne({isn_id: isn_id_cop}, {$set: {reservado}});
          const {acknowledged} = await this.collection.insertOne(devolution);
          return acknowledged;
        } else {
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}