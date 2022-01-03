import {LoginService} from "../service/loginService";
import fastifyPlugin from "fastify-plugin";
import "fastify-mongodb";
import "fastify-jwt";

const schemas = require("../schemas/loginSchema");
const server = require("../index");

export async function logonRoutes(fastify: typeof server) {
  const login: LoginService = new LoginService(fastify, "funcionario");

  fastify.post('/login', {
      schema: schemas.login
    },
    async (request: any, reply: any) => {
      try {
        const {cpf, passwd} = request.body;
        const verify = await login.logIn(cpf, passwd);
        if (Array.isArray(verify) && verify.length > 0)
          return verify;
        return reply.status(400).send({msg: "Usuário ou Senha incorretos."})
      } catch (error) {
        throw error;
      }
    });

  fastify.get('/verify', {
      preValidation: [fastify.jwtauthentication]
    },
    async (request: any, reply: any) => {
      try {
        const raw = request.headers.authorization.split(" ");
        await fastify.jwt.verify(raw[1]);
        reply.send({msg: 'OK'})
      } catch (error) {
        reply.send(error);
      }
    });

  fastify.get('/verifyToken', {
      preValidation: [fastify.jwtauthentication]
    },
    async (request: any, reply: any) => {
      try {
        const raw = request.headers.authorization.split(" ");
        await fastify.jwt.verify(raw[1]);
        return await login.getUserContext(raw[1]);
      } catch (error) {
        reply.send(error);
      }
    });
}

const loginRoutes = fastifyPlugin(logonRoutes);
export {loginRoutes};