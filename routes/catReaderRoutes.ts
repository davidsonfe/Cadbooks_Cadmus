import {CatReaderService} from "../service/catReaderService";
import {CatReaderModel} from "../models/catReaderModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/catReaderSchema");
const server = require("../index");

export async function clientCatRoutes(fastify: typeof server) {
  const catReader: CatReaderService = new CatReaderService(fastify, "cat_leitor");

  fastify.get("/reader_cat/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catReaderAllSchema
    },
    async (request: any, reply: any) => {
      try {
        const catReaders = await catReader.getCatReaders();
        if (Array.isArray(catReaders) && catReaders.length > 0)
          return catReaders;
        reply.status(404).send({msg: "Categorias não encontradas."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/reader_cat/findone/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catReaderOneSchema
    },
    async (request: any, reply: any) => {
      try {
        const read = await catReader.getCatReader(request.params.doc_id);
        if (Array.isArray(read) && read.length > 0)
          return read;
        return reply.status(404).send({msg: "Categoria de leitor não encontrada."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/reader_cat/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catReaderBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catReader.postCatReader(request.body as CatReaderModel);
        if (verify)
          return reply.status(200).send({msg: "Categoria Leitor cadastrado com sucesso."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.put("/reader_cat/update/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catReaderUpDelSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catReader.updateCatReader(request.params.doc_id, request.body as CatReaderModel);
        if (verify)
          return reply.status(200).send({msg: "Categoria Leitor atualizado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/reader_cat/delete/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catReaderUpDelSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catReader.deleteCatReader(request.params.doc_id);
        if (verify)
          return reply.status(200).send({msg: "Categoria Leitor removido."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const catReadersRoutes = fastifyPlugin(clientCatRoutes);
export {catReadersRoutes};