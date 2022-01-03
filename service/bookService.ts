import {BookModel} from "../models/bookModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class BookService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getBooks() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getBook(isn_id: string) {
    try {
      if (this.collection) {
        const book = await this.collection.find({isn_id: isn_id}).project({_id: 0}).toArray();
        if (Array.isArray(book) && book.length > 0) {
          return book;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async postBook(livro: BookModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.insertOne(livro);
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateBook(isn_id: string, livro: BookModel) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.updateOne({isn_id: isn_id}, {$set: {...livro}});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(isn_id: string) {
    try {
      if (this.collection){
        const {acknowledged} = await this.collection.deleteOne({isn_id: isn_id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}