
import {EmprestimoService} from "../service/emprestimoService";
import {EmprestimoModel} from "../models/emprestimoModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/emprestimoSchema");
const server = require("../index");

export async function borrowRoutes(fastify: typeof server) {
    const emprestimo: EmprestimoService = new EmprestimoService(fastify, "emprestimo");

    fastify.get("/emprestimo/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.emprestimoSchema},
        async (request: any, reply: any) => {
            return await emprestimo.getEmprestimos();
        });

    fastify.get("/emprestimo/findone/:id_emprestimo", {preValidation: [fastify.jwtauthentication], schema: schemas.emprestimoSchema},
        async (request: any, reply: any) => {
            return await emprestimo.getEmprestimo(request.params.id_emprestimo);
        });

    fastify.post("/emprestimo/register", {preValidation: [fastify.jwtauthentication], schema: schemas.emprestimoBodySchema},
        async (request: any, reply: any) => {
            return await emprestimo.postEmprestimo(request.body as EmprestimoModel);
        });

    fastify.put("/emprestimo/update/:id_emprestimo", {preValidation: [fastify.jwtauthentication], schema: schemas.emprestimoUpdateSchema},
        async (request: any, reply: any) => {
            return await emprestimo.updateEmprestimo(request.params.id_emprestimo, request.body as EmprestimoModel);
        });

    fastify.delete("/emprestimo/delete/:id_emprestimo", {preValidation: [fastify.jwtauthentication], schema: schemas.emprestimoDeleteSchema},
        async (request: any, reply: any) => {
            return await emprestimo.deleteEmprestimo(request.params.id_emprestimo);
        });
}

const emprestimoRoutes = fastifyPlugin(borrowRoutes);
export {emprestimoRoutes};