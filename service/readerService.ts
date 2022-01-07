import {ReaderModel} from "../models/readerModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";
import { validateCPF } from "../validations/validateCPF";


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

  async postReader(reader: ReaderModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = reader;
        reader.dt_nasc = new Date(dt_nasc);
        if (validateCPF(reader.doc_id)) {
          const {acknowledged} = await this.collection.insertOne(reader);
          return acknowledged;
        }
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateReader(id: string, reader: ReaderModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = reader;
        reader.dt_nasc = new Date(dt_nasc);
        if (validateCPF(reader.doc_id)) {
          const {acknowledged} = await this.collection.insertOne(reader);
          return acknowledged;
        }
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