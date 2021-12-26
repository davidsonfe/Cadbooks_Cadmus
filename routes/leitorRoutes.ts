
import {LeitorService} from "../service/leitorService";
import {LeitorModel} from "../models/leitorModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/leitorSchema");
const server = require("../index");

export async function customerRoutes(fastify: typeof server) {
    const leitor: LeitorService = new LeitorService(fastify, "leitor");

    fastify.get("/leitor/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.leitorSchema},
        async (request: any, reply: any) => {
            return await leitor.getLeitores();
        });

    fastify.get("/leitor/findone", {preValidation: [fastify.jwtauthentication], schema: schemas.leitorSchema},
        async (request: any, reply: any) => {
            return await leitor.getLeitor(request.query.doc_id);
        });

    fastify.post("/leitor/register", {preValidation: [fastify.jwtauthentication], schema: schemas.leitorBodySchema},
        async (request: any, reply: any) => {
            return await leitor.postLeitor(request.body as LeitorModel);
        });

    fastify.put("/leitor/update", {preValidation: [fastify.jwtauthentication], schema: schemas.leitorUpdateSchema},
        async (request: any, reply: any) => {
            return await leitor.updateLeitor(request.query.doc_id, request.body as LeitorModel);
        });

    fastify.delete("/leitor/delete", {preValidation: [fastify.jwtauthentication], schema: schemas.leitorDeleteSchema},
        async (request: any, reply: any) => {
            return await leitor.deleteLeitor(request.query.doc_id);
        });
}

const leitorRoutes = fastifyPlugin(customerRoutes);
export {leitorRoutes};