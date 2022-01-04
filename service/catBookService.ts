import {CatBookModel} from "../models/catBookModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class CatBookService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getCatBooks() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getCatBook(id: string) {
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

  async postCatBook(bookCat: CatBookModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.insertOne(bookCat);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateCatBook(id: string, bookCat: CatBookModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.updateOne({cat_id: id}, {$set: {...bookCat}});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCatBook(id: string) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.deleteOne({cat_id: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}
