import {ReaderService} from "../service/readerService";
import {CatReaderModel} from "../models/readerModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/readersSchema");
const server = require("../index");

export async function clientRoutes(fastify: typeof server) {
  const reader: ReaderService = new ReaderService(fastify, "leitores");

  fastify.get("/reader/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.readersAllSchema
    },
    async (request: any, reply: any) => {
      try {
        const readers = await reader.getReaders();
        if (Array.isArray(readers) && readers.length > 0) {
          for (let i = 0; i < readers.length; i++) {
            readers[i].dt_nasc = readers[i].dt_nasc.toLocaleDateString("pt-BR");
          }
          return readers;
        }
        reply.status(404).send({msg: "Leitores não encontrados."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/reader/findone/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.readersSchema
    },
    async (request: any, reply: any) => {
      try {
        const read = await reader.getReader(request.params.doc_id);
        if (Array.isArray(read) && read.length > 0) {
          read[0].dt_nasc = read[0].dt_nasc.toLocaleDateString("pt-BR");
          return read;
        }
        return reply.status(404).send({msg: "Leitor não encontrado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/reader/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.readerBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await reader.postReader(request.body as CatReaderModel);
        if (verify)
          return reply.status(200).send({msg: "Leitor cadastrado com sucesso."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.put("/reader/update/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.readerUpdateSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await reader.updateReader(request.params.doc_id, request.body as CatReaderModel);
        if (verify)
          return reply.status(200).send({msg: "Leitor atualizado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/reader/delete/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.readerDeleteSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await reader.deleteReader(request.params.doc_id);
        if (verify)
          return reply.status(200).send({msg: "Leitor removido."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const readersRoutes = fastifyPlugin(clientRoutes);
export {readersRoutes};