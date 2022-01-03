import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-jwt";

async function jwtAuth(fastify: FastifyInstance) {
  fastify.decorate('jwtauthentication', async (req: any, rep: any) => {
    try {
      await req.jwtVerify();
    } catch (error) {
      rep.send(error);
    }

  });
}

const jwtConn = fastifyPlugin(jwtAuth);
export {jwtConn};
