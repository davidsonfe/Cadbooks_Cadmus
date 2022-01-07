import {WorkerModel} from "../models/workerModel";
import {FastifyInstance} from "fastify";
import "fastify-mongodb";
import {validateCPF} from "../validations/validateCPF";

const bcrypt = require("bcrypt");

export class WorkerService {
  collection;

  constructor(fastify: FastifyInstance, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
    }
  }

  async getWorkers() {
    try {
      if (this.collection)
        return await this.collection.find({}).project({_id: 0, passwd: 0}).toArray();
    } catch (error) {
      throw error;
    }
  }

  async getWorker(id: string) {
    try {
      if (this.collection) {
        const worker = await this.collection.find({cpf: id}).project({_id: 0, passwd: 0, token: 0}).toArray();
        if (Array.isArray(worker) && worker.length > 0)
          return worker;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async postWorker(worker: WorkerModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = worker;
        worker.dt_nasc = new Date(dt_nasc);
        worker.passwd = await bcrypt.hash(worker.passwd, 10);
        if (validateCPF(worker.cpf)) {
          const {acknowledged} = await this.collection.insertOne(worker);
          return acknowledged;
        }
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateWorker(id: string, worker: WorkerModel) {
    try {
      if (this.collection) {
        const {dt_nasc} = worker;
        worker.dt_nasc = new Date(dt_nasc);
        if (validateCPF(worker.cpf)) {
          const {acknowledged} = await this.collection.updateOne({cpf: id}, {$set: {...worker}});
          return acknowledged;
        }
        return false
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteWorker(id: string) {
    try {
      if (this.collection) {
        const {acknowledged} = await this.collection.deleteOne({cpf: id});
        return acknowledged;
      }
    } catch (error) {
      throw error;
    }
  }
}