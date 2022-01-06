import {BorrowService} from "../service/borrowService";
import {BorrowModel} from "../models/borrowModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/borrowSchema");
const server = require("../index");

export async function borrowwRoutes(fastify: typeof server) {
  const borrow: BorrowService = new BorrowService(fastify, "emprestimo", "livros", "leitores");

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

  fastify.get("/borrow/report", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.borrowReportSchema
    },
    async (request: any, reply: any) => {
      try {
        const brws = await borrow.getBorrowsReport();
        if (Array.isArray(brws) && brws.length > 0)
          return brws;
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const borrowRoutes = fastifyPlugin(borrowwRoutes);
export {borrowRoutes};