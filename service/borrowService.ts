import {BorrowModel} from "../models/borrowModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class BorrowService {
  collection;
  collection2;
  collection3;
  collection4;

  constructor(fastify: FastifyInstance, collection: string, collection2: string, collection3: string, collection4: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.collection2 = fastify.mongo.db.collection(collection2);
      this.collection3 = fastify.mongo.db.collection(collection3);
      this.collection4 = fastify.mongo.db.collection(collection4);
    }
  }

  async postBorrow(borrow: BorrowModel) {
    try {
      if (this.collection && this.collection2 && this.collection3 && this.collection4) {
        borrow.dt_empr = new Date();
        const limite = await this.collection2.find({isn_id: borrow.isn_id_cop}).project({_id: 0}).toArray();
        const userExist = await this.collection3.find({doc_id: borrow.doc_id}).project({_id: 0}).toArray();
        if (Array.isArray(limite) && userExist.length > 0) {
          if (limite[0].reservado && !limite[0].emprestado) {
            let dia_devol = borrow.dt_empr.getDate() + limite[0].categoria.dias_limite;
            if (dia_devol <= 30) {
              borrow.dt_devol = new Date(`${borrow.dt_empr.getMonth() + 1}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const reservado = false;
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado, reservado}});
              await this.collection4.delete({isn_id_cop: borrow.isn_id_cop});
              const {acknowledged} = await this.collection.insertOne(borrow);
              return acknowledged;

            } else if (dia_devol > 30) {
              const mes_devol = borrow.dt_empr.getMonth() + 2;
              dia_devol -= 30;
              borrow.dt_devol = new Date(`${mes_devol}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const reservad = false;
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado, reservad}});
              await this.collection4.delete({isn_id_cop: borrow.isn_id_cop});
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

  async getBorrowsReport() {
    try {
      if (this.collection && this.collection2 && this.collection3) {
        const brws = await this.collection.find({}).project({_: 0}).toArray();
        const bks = await this.collection2.find({emprestado: true}).project({_id: 0}).toArray();
        const brrws = Object();
        const dt = Array();
        for (let i = 0; i < bks.length; i++) {
          brrws["dt_empr"] = brws[i].dt_empr.toLocaleDateString("pt-BR");
          brrws["dt_devol"] = brws[i].dt_devol.toLocaleDateString("pt-BR");
          brrws["nome"] = (await this.collection3.find({doc_id: brws[i].doc_id}).project({_id: 0})
            .toArray())[0].nome;
          brrws["titulo"] = (await this.collection2.find({isn_id: brws[i].isn_id_cop}).project({_id: 0})
            .toArray())[0].titulo;
          brrws["categoria"] = (await this.collection2.find({isn_id: brws[i].isn_id_cop}).project({_id: 0})
            .toArray())[0].categoria.cat_id;
          dt.push(brrws);
        }
        return dt;
      }
    } catch (error) {
      throw error;
    }
  }
}