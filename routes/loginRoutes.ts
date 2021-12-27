import {LoginService} from "../service/loginService";
import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-mongodb";
import "fastify-jwt";

const schemas = require("../schemas/loginSchema");

export async function logonRoutes(fastify: FastifyInstance) {
    const login: LoginService = new LoginService(fastify, "funcionario");

    fastify.post('/login', { schema: schemas.login }, async (request: any, reply: any) => {
        try {
            const { cpf, passwd } = request.body;
            const valid =  await login.logIn(cpf, passwd);
            if (typeof valid !== "undefined") {
                return { token: fastify.jwt.sign({cpf, passwd}, {expiresIn: 16400}) };
            } else {
                reply.code(401).send( { msg: "Usuário ou senha incorretos!"})
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    });
}

const loginRoutes = fastifyPlugin(logonRoutes);
export {loginRoutes};