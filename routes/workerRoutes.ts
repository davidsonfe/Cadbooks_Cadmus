import fastifyPlugin from "fastify-plugin";
import {WorkerService} from "../service/workerService";
import {WorkerModel} from "../models/workerModel";

const schemas = require("../schemas/workerSchema");
const server = require("../index");

export async function funcRoutes(fastify: typeof server) {
  const worker: WorkerService = new WorkerService(fastify, "funcionario");

  fastify.get("/worker/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.workersAllSchema
    },
    async (request: any, reply: any) => {
      try {
        const workers = await worker.getWorkers();
        if (Array.isArray(workers) && workers.length > 0) {
          for (let i = 0; i < workers.length; i++)
            workers[i].dt_nasc = workers[i].dt_nasc.toLocaleDateString("pt-BR");
          return workers;
        }
        reply.status(404).send({msg: "Nenhum funcionário encontrado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/worker/findone/:cpf", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.workersSchema
    },
    async (request: any, reply: any) => {
      try {
        const wk = await worker.getWorker(request.params.cpf);
        if (Array.isArray(wk)) {
          wk[0].dt_nasc = wk[0].dt_nasc.toLocaleDateString("pt-BR");
          return wk;
        }
        return reply.status(404).send({msg: "Funcionário não encontrado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/worker/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.workerRegisterSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await worker.postWorker(request.body as WorkerModel);
        if (verify)
          return reply.status(200).send({msg: "Funcionário cadastrado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.put("/worker/update/:cpf", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.workerUpdateSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await worker.updateWorker(request.params.cpf, request.body as WorkerModel);
        if (verify)
          return reply.status(200).send({msg: "Funcionário atualizado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/worker/delete/:cpf", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.workerDeleteSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await worker.deleteWorker(request.params.cpf);
        if (verify)
          return reply.status(200).send({msg: "Funcionário removido."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const workerRoutes = fastifyPlugin(funcRoutes);
export {workerRoutes};