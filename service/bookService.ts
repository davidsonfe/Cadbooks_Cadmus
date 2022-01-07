import {BookModel} from "../models/bookModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";

export class BookService {
  collection;
  collection2;
  collection3;

  constructor(fastify: FastifyInstance, collection: string, collection2: string, collection3: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
      this.collection3 = fastify.mongo.db.collection(collection3);
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

  async getBookReport() {
    try {
      if (this.collection2 && this.collection3) {
        const brws = await this.collection2.find({}).project({_: 0}).toArray();
        let unt = Object();
        let report = Array();
        const today = new Date();
        for (let i = 0; i < brws.length; i++) {
          if (brws[i].dt_devol.getDate() < today.getDate() || brws[i].dt_devol.getMonth() < today.getMonth()) {
            unt["nome"] = (await this.collection3.find({doc_id: brws[i].doc_id}).project({_id: 0})
              .toArray())[0].nome;
            unt["tel"] = (await this.collection3.find({doc_id: brws[i].doc_id}).project({_id: 0})
              .toArray())[0].tel;
            unt["email"] = (await this.collection3.find({doc_id: brws[i].doc_id}).project({_id: 0})
              .toArray())[0].email;
            unt["dt_empr"] = brws[i].dt_empr.toLocaleDateString("pt-BR");
            unt["dt_devol"] = brws[i].dt_devol.toLocaleDateString("pt-BR");
            report.push(unt);
            unt = {};
          }
        }
        return report;
      }
    } catch (error) {
      throw error;
    }
  }
}