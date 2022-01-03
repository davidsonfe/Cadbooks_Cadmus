import {CatReaderModel} from "../models/readerModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class ReaderService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getReaders() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getReader(id: string) {
    try {
      if (this.collection) {
        const reader = await this.collection.find({doc_id: id}).project({_id: 0}).toArray();
        if (Array.isArray(reader))
          return reader;
        return {};
      }
    } catch (error) {
      throw error;
    }
  }

  async postReader(leitor: CatReaderModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = leitor;
        leitor.dt_nasc = new Date(dt_nasc);
        const {acknowledged} = await this.collection.insertOne(leitor);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateReader(id: string, leitor: CatReaderModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = leitor;
        leitor.dt_nasc = new Date(dt_nasc);
        const {acknowledged} = await this.collection.updateOne({doc_id: id}, {$set: {...leitor}});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteReader(id: string) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.deleteOne({doc_id: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}