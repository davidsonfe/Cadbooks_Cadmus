import {BorrowService} from "../service/borrowService";
import {BorrowModel} from "../models/borrowModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/borrowSchema");
const server = require("../index");

export async function borrowwRoutes(fastify: typeof server) {
  const borrow: BorrowService = new BorrowService(fastify, "emprestimo", "livros");

  fastify.get("/borrow/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.borrowSchema
    },
    async (request: any, reply: any) => {
      try {
        const borrows = await borrow.getBorrows();
        if (Array.isArray(borrows) && borrows.length > 0) {
          for (let i = 0; i < borrows.length; i++) {
            borrows[i].dt_empr = borrows[i].dt_empr.toLocaleDateString("pt-BR");
            borrows[i].dt_devol = borrows[i].dt_devol.toLocaleDateString("pt-BR");
          }
          return borrows;
        }
        reply.status(404).send({msg: "Nenhum empréstimo encontrado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/borrow/findone/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.borrowSchema
    },
    async (request: any, reply: any) => {
      try {
        const brrow = await borrow.getBorrow(request.params.doc_id);
        if (Array.isArray(brrow) && brrow.length > 0) {
          brrow[0].dt_empr = brrow[0].dt_empr.toLocaleDateString("pt-BR");
          brrow[0].dt_devol = brrow[0].dt_devol.toLocaleDateString("pt-BR");
          return brrow;
        }
        reply.status(404).send({msg: "Empréstimo não encontrado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/borrow/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.borrowBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await borrow.postBorrow(request.body as BorrowModel);
        if (verify)
          return reply.status(200).send({msg: "Empréstimo cadastrado."});
        reply.status(400).send({msg: "Obra Reservada ou Emprestada."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/borrow/delete/:doc_id", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.borrowDeleteSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await borrow.deleteBorrow(request.params.id_emprestimo);
        if (verify)
          return reply.status(200).send({msg: "Empréstimo removido."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const borrowRoutes = fastifyPlugin(borrowwRoutes);
export {borrowRoutes};