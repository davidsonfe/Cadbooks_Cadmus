import {LoginService} from "../service/loginService";
import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-mongodb";
import "fastify-jwt";


const schemas = require("../schemas/loginSchema");
// const bcrypt = require("bcrypt");

export async function logonRoutes(fastify: FastifyInstance) {
    const login: LoginService = new LoginService(fastify, "funcionario");

    fastify.post('/login', { schema: schemas.login }, async (request: any, reply: any) => {
        try {
            const { cpf, passwd } = request.body;
            const teste =  await login.logIn(cpf, passwd);
            return {token: fastify.jwt.sign({cpf, passwd}, {expiresIn: 16400})};
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
}

const loginRoutes = fastifyPlugin(logonRoutes);
export {loginRoutes};