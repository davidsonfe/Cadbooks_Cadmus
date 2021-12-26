import {LoginService} from "../service/loginService";
import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-mongodb";
import "fastify-jwt";
import {FuncionarioModel} from "../models/funcionarioModel";


const schemas = require("../schemas/loginSchema");

export async function logonRoutes(fastify: FastifyInstance) {
    const login: LoginService = new LoginService(fastify, "funcionario");

    fastify.post('/login', { schema: schemas.login }, async (request: any, reply: any) => {
        try {
            const { cpf, passwd } = request.body;
            const token = await login.logIn(cpf, passwd);
            if (token) {
                return ({token: fastify.jwt.sign({doc_id: cpf, passwd}, {expiresIn: 16400})});
            } else {
                reply.status(400).send({error: true, msg: "Todos os campos são obrigatórios!"});
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    });

    fastify.post('/signin', { schema: schemas.login }, async (request: any, reply: any) => {
        try {
            return await login.signIn(request.body as FuncionarioModel);
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
}

const loginRoutes = fastifyPlugin(logonRoutes);
export {loginRoutes};