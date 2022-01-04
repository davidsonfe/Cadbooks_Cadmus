import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-cors";

async function corss(fastify: FastifyInstance) {
  fastify.register(require('fastify-cors'), {
    origin: true
  });
}

const cors = fastifyPlugin(corss);
export {cors};
