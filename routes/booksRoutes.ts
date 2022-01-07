import fastifyPlugin from "fastify-plugin";
import {BookService} from "../service/bookService";
import {BookModel} from "../models/bookModel";

const schemas = require("../schemas/bookSchema");
const server = require("../index");

export async function bookRoutes(fastify: typeof server) {
  const books: BookService = new BookService(fastify, "livros", "emprestimo", "leitores");

  fastify.get("/books/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookSchema
    },
    async (request: any, reply: any) => {
      try {
        const bks = await books.getBooks();
        if (Array.isArray(bks) && bks.length > 0) {
          return bks;
        }
        reply.status(404).send({msg: "Nenhum livro encontrado."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });

  fastify.get("/books/findone/:isn_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookSchema
    },
    async (request: any, reply: any) => {
      try {
        const bk = await books.getBook(request.params.isn_id);
        if (Array.isArray(bk) && bk.length > 0) {
          return bk;
        }
        reply.status(404).send({msg: "Livro não encontrado."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });

  fastify.post("/books/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await books.postBook(request.body as BookModel);
        if (verify)
          return reply.status(200).send({msg: "Cadastro de livro realizado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });

  fastify.put("/books/update/:isn_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookUpdateSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await books.updateBook(request.params.isn_id, request.body as BookModel);
        if (verify)
          return reply.status(200).send({msg: "Livro atualizado."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });

  fastify.delete("/books/delete/:isn_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookDeleteSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await books.deleteBook(request.params.isn_id);
        if (verify)
          return reply.status(200).send({msg: "Livro removido."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });

  fastify.get("/books/report", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.bookSchema
    },
    async (request: any, reply: any) => {
      try {
        const bk = await books.getBookReport();
        if (Array.isArray(bk) && bk.length > 0)
          return bk;
        reply.status(404).send({msg: "Livro não encontrado."});
      } catch (err) {
        reply.status(500).send({msg: err});
      }
    });
}

const booksRoutes = fastifyPlugin(bookRoutes);
export {booksRoutes};