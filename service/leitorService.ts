import {LeitorDTO} from "../dto/leitor.dto";
import {FastifyInstance} from "fastify";

export class LeitorService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getLeitores() {
    if (this.collection) return this.collection.find({}).project({_id:0}).toArray();
    return {};
  }

  async getLeitor(email: string) {
    if (this.collection) return this.collection.find({email}).project({_id:0}).toArray();
    return {};
  }

  async postLeitor(leitor: LeitorDTO) {
    if (this.collection) await this.collection.insertOne(leitor);
    return {};
  }

  async updateLeitor(email: string, leitor: LeitorDTO) {
    if (this.collection) this.collection.updateOne({email}, {$set:{ ...leitor }});
    return {};
  }

  async deleteLeitor(email: string) {
    if (this.collection) this.collection.deleteOne({email});
    return {};
  }
}
