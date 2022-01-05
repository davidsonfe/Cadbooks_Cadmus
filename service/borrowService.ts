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
              borrow.dt_devol = new Date(`${borrow.dt_empr.getMonth() + 1}-${dia_devol}-${borrow.dt_empr.getFullYear()}`);
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

  async getBorrowsReport() {
    // O sistema deve permitir a impressão de uma listagem das obras emprestadas no momento,
    // agrupadas por categoria de obra, contendo o nome do leitor, título da obra, data de retirada e
    // data prevista para devolução.

      try {
      if (this.collection && this.collection2 && this.collection3) {
        const bks = await this.collection.find({}).project({_id:0}).toArray();
        const brrws = Object();
        const dt = Array();
        for (let i = 0; i < bks.length; i++) {
          brrws["dt_empr"] = bks[i].dt_empr.toLocaleDateString("pt-BR");
          brrws["dt_devol"] = bks[i].dt_devol.toLocaleDateString("pt-BR");
          brrws["nome"] = (await this.collection3.find({doc_id: bks[i].doc_id}).project({_id:0}).toArray())[0].nome;
          brrws["titulo"] = (await this.collection2.find({isn_id: bks[i].isn_id_cop}).project({_id:0}).toArray())[0].titulo;
          brrws["categoria"] = (await this.collection2.find({isn_id: bks[i].isn_id_cop})
            .project({_id:0})
            .toArray())[0]
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