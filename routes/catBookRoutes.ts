import {CatBookService} from "../service/catBookService";
import {CatBookModel} from "../models/catBookModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/catBookSchema");
const server = require("../index");

export async function bookCatRoutes(fastify: typeof server) {
  const catBook: CatBookService = new CatBookService(fastify, "cat_livro");

  fastify.get("/book_cat/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catBookAllSchema
    },
    async (request: any, reply: any) => {
      try {
        const catBooks = await catBook.getCatBooks();
        if (Array.isArray(catBooks) && catBooks.length > 0)
          return catBooks;
        reply.status(404).send({msg: "Categorias não encontradas."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/book_cat/findone/:cat_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catBookOneSchema
    },
    async (request: any, reply: any) => {
      try {
        const read = await catBook.getCatBook(request.params.cat_id);
        if (Array.isArray(read) && read.length > 0)
          return read;
        return reply.status(404).send({msg: "Categoria de livro não encontrada."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/book_cat/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catBookBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catBook.postCatBook(request.body as CatBookModel);
        if (verify)
          return reply.status(200).send({msg: "Categoria Livro cadastrada com sucesso."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.put("/book_cat/update/:cat_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catBookBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catBook.updateCatBook(request.params.cat_id, request.body as CatBookModel);
        if (verify)
          return reply.status(200).send({msg: "Categoria Livro atualizada."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/book_cat/delete/:cat_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.catBookUpDelSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await catBook.deleteCatBook(request.params.cat_id);
        if (verify)
          return reply.status(200).send({msg: "Categoria Livro removida."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const catBookRoutes = fastifyPlugin(bookCatRoutes);
export {catBookRoutes};