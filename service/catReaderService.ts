import {CatReaderModel} from "../models/catReaderModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class CatReaderService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getCatReaders() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getCatReader(id: string) {
    try {
      if (this.collection) {
        const catReader = await this.collection.find({cat_id: id}).project({_id: 0}).toArray();
        if (Array.isArray(catReader) && catReader.length > 0)
          return catReader;
      }
    } catch (error) {
      throw error;
    }
  }

  async postCatReader(leitorCat: CatReaderModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.insertOne(leitorCat);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCatReader(id: string, leitorCat: CatReaderModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.updateOne({doc_id: id}, {$set: {...leitorCat}});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCatReader(id: string) {
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
