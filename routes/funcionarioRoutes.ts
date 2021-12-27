import fastifyPlugin from "fastify-plugin";
import {FuncionarioService} from "../service/funcionarioService";
import {FuncionarioModel} from "../models/funcionarioModel";

const schemas = require("../schemas/funcionarioSchema");
const server = require("../index");

export async function funcRoutes(fastify: typeof server) {
    const leitor: FuncionarioService = new FuncionarioService(fastify, "funcionario");

    fastify.get("/funcionario/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.funcsSchema},
        async (request: any, reply: any) => {
            return await leitor.getFuncs();
        });

    fastify.get("/funcionario/findone", {preValidation: [fastify.jwtauthentication], schema: schemas.funcsSchema},
        async (request: any, reply: any) => {
            return await leitor.getFunc(request.query.cpf);
        });

    fastify.post("/funcionario/register", {preValidation: [fastify.jwtauthentication], schema: schemas.funcRegisterSchema},
        async (request: any, reply: any) => {
            return await leitor.postFunc(request.body as FuncionarioModel);
        });

    fastify.put("/funcionario/update", {preValidation: [fastify.jwtauthentication], schema: schemas.funcUpdateSchema},
        async (request: any, reply: any) => {
            return await leitor.updateFunc(request.query.cpf, request.body as FuncionarioModel);
        });

    fastify.delete("/funcionario/delete", {preValidation: [fastify.jwtauthentication], schema: schemas.funcDeleteSchema},
        async (request: any, reply: any) => {
            return await leitor.deleteFunc(request.query.cpf);
        });
}

const funcionarioRoutes = fastifyPlugin(funcRoutes);
export {funcionarioRoutes};