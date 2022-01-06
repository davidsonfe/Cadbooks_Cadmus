import {BorrowModel} from "../models/borrowModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";


export class BorrowService {
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

  async postBorrow(borrow: BorrowModel) {
    try {
      if (this.collection && this.collection2) {
        const {dt_empr} = borrow;
        borrow.dt_empr = new Date(dt_empr);
        const limite = await this.collection2.find({isn_id: borrow.isn_id_cop}).project({_id: 0}).toArray();

        if (Array.isArray(limite) && limite.length > 0) {
          if (limite[0].reservado && !limite[0].emprestado) {
            let dia_devol = borrow.dt_empr.getDate() + limite[0].categoria.dias_limite;
            if (dia_devol <= 30) {
              borrow.dt_devol = new Date(`${borrow.dt_empr.getMonth() + 1}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const reservado = false;
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado, reservado}});
              const {acknowledged} = await this.collection.insertOne(borrow);
              return acknowledged;

            } else if (dia_devol > 30) {
              const mes_devol = borrow.dt_empr.getMonth() + 2;
              dia_devol -= 30;
              borrow.dt_devol = new Date(`${mes_devol}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
              const reservado = false;
              const emprestado = true;
              await this.collection2.updateOne({isn_id: borrow.isn_id_cop}, {$set: {emprestado, reservado}});
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
        const bks = await this.collection.find({}).project({_id: 0}).toArray();
        const brrws = Object();
        const dt = Array();
        for (let i = 0; i < bks.length; i++) {
          brrws["dt_empr"] = bks[i].dt_empr.toLocaleDateString("pt-BR");
          brrws["dt_devol"] = bks[i].dt_devol.toLocaleDateString("pt-BR");
          brrws["nome"] = (await this.collection3.find({doc_id: bks[i].doc_id}).project({_id: 0}).toArray())[0].nome;
          brrws["titulo"] = (await this.collection2.find({isn_id: bks[i].isn_id_cop}).project({_id: 0}).toArray())[0]
            .titulo;
          brrws["categoria"] = (await this.collection2.find({isn_id: bks[i].isn_id_cop}).project({_id: 0}).toArray())[0]
            .categoria.cat_id;
          dt.push(brrws);
        }
        return dt;
      }
    } catch (error) {
      throw error;
    }
  }
}