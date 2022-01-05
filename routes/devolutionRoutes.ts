import {DevolutionService} from "../service/devolutionService";
import {DevolutionModel} from "../models/devolutionModel";
import fastifyPlugin from "fastify-plugin";
import {isNumber} from "util";
import {isNumberObject} from "util/types";

const schemas = require("../schemas/devolutionSchema");
const server = require("../index");

export async function devlutionRoutes(fastify: typeof server) {
  const devolution: DevolutionService = new DevolutionService(fastify, "devolucao", "livros", "emprestimo");

  fastify.post("/devolution/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.devolutionBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const penalty = await devolution.postDevolution(request.body.isn_id_cop, request.body as DevolutionModel);
        if (isNumberObject(penalty))
          return {penalty}
        reply.status(400).send({msg: "Favor preencher corretamente os campos."})
      } catch (error) {
        reply.status(500).send({message: error});
      }
    });
}

const devolutionRoutes = fastifyPlugin(devlutionRoutes);
export {devolutionRoutes};