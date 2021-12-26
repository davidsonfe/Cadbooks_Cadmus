import {LoginService} from "../service/loginService";
import {FastifyInstance} from "fastify";
import fastifyPlugin from "fastify-plugin";
import "fastify-mongodb";
import "fastify-jwt";


const schemas = require("../schemas/loginSchema");

export async function logonRoutes(fastify: FastifyInstance) {
    const login: LoginService = new LoginService(fastify, "login");

    fastify.post('/login', { schema: schemas.login }, async (request: any, reply: any) => {
        try {
            const { doc_id, passwd } = request.body;
            const token = await login.logIn(doc_id, passwd);
            if (token) {
                return ({token: fastify.jwt.sign({doc_id, passwd}, {expiresIn: 16400})});
            } else {
                reply.status(400).send({error: true, msg: "Todos os campos são obrigatórios!"});
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    });
}

const loginRoutes = fastifyPlugin(logonRoutes);
export {loginRoutes};