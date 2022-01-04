import {BorrowModel} from "../models/borrowModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class BorrowService {
  collection;
  collection2;

  constructor(fastify: FastifyInstance, collection: string, collection2: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
    }
  }

  async getBorrows() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getBorrow(id: string) {
    try {
      if (this.collection) {
        const borrow = await this.collection.find({doc_id: id}).project({_id: 0}).toArray();
        if (Array.isArray(borrow) && borrow.length > 0)
          return borrow;
      }
    } catch (error) {
      throw error;
    }
  }

  async postBorrow(borrow: BorrowModel) {
    try {
      if (this.collection && this.collection2) {
        const {dt_empr} = borrow;
        borrow.dt_empr = new Date(dt_empr);
        const limite = await this.collection2.find({isn_id: borrow.isn_id_cop}).project({_id: 0}).toArray();

        if (Array.isArray(limite) && limite.length > 0) {
          if (!limite[0].reservado && !limite[0].emprestado) {
            let dia_devol = borrow.dt_empr.getDate() + limite[0].categoria.dias_limite;
            if (dia_devol <= 30) {
              borrow.dt_devol = new Date(`${borrow.dt_empr.getMonth()+1}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado}});
              const {acknowledged} = await this.collection.insertOne(borrow);
              return acknowledged;

            } else if (dia_devol > 30) {
              const mes_devol = borrow.dt_empr.getMonth() + 2;
              dia_devol -= 30;
              borrow.dt_devol = new Date(`${mes_devol}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado}});
              const {acknowledged} = await this.collection.insertOne(borrow);
              return acknowledged;
            }
          } else {
            return false;
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteBorrow(id: string) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.deleteOne({id_emprestimo: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}