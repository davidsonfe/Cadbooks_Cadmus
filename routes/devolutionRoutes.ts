import {DevolutionService} from "../service/devolutionService";
import {DevolutionModel} from "../models/devolutionModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/devolutionSchema");
const server = require("../index");

export async function devlutionRoutes(fastify: typeof server) {
  const devolution: DevolutionService = new DevolutionService(fastify, "devolucao", "livros");

  fastify.post("/devolution/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.devolutionBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await devolution.postDevolution(request.body.isn_id_cop, request.body as DevolutionModel);
        if (verify)
          return reply.status(200).send({msg: "Devolução efetuada."})
        reply.status(400).send({msg: "Favor preencher corretamente os campos."})
      } catch (error) {
        reply.status(500).send({message: error});
      }
    });
}

const devolutionRoutes = fastifyPlugin(devlutionRoutes);
export {devolutionRoutes};