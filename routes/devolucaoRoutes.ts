
import {DevolucaoService} from "../service/devolucaoService";
import {DevolucaoModel} from "../models/devolucaoModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/devolucaoSchema");
const server = require("../index");

export async function devolutionRoutes(fastify: typeof server) {
    const devolucao: DevolucaoService = new DevolucaoService(fastify, "devolucao");

    fastify.get("/devolucao/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoSchema},
        async (request: any, reply: any) => {
            return await devolucao.getDevolucoes();
        });

    fastify.get("/devolucao/findone/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoSchema},
        async (request: any, reply: any) => {
            return await devolucao.getDevolucao(request.params.id_obracop);
        });

    fastify.post("/devolucao/register", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoBodySchema},
        async (request: any, reply: any) => {
            return await devolucao.postDevolucao(request.body as DevolucaoModel);
        });

    fastify.put("/devolucao/update/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoUpdateSchema},
        async (request: any, reply: any) => {
            return await devolucao.updateDevolucao(request.params.id_obracop, request.body as DevolucaoModel);
        });

    fastify.delete("/devolucao/delete/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoDeleteSchema},
        async (request: any, reply: any) => {
            return await devolucao.deleteDevolucao(request.params.id_obracop);
        });
}

const DevolucaoRoutes = fastifyPlugin(devolutionRoutes);
export {DevolucaoRoutes};