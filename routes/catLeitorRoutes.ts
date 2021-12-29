import fastifyPlugin from "fastify-plugin";

import {catLeitorService} from "../service/catLeitorService";
import {catLeitorModel} from "../models/catLeitorModel";

const schemas = require("../schemas/catLeitorSchema");
const server = require("../index");

export async function catCustomerRoutes(fastify: typeof server) {
    const catLeitor: catLeitorService = new catLeitorService(fastify, "catLeitor");

    fastify.get("/catleitor/findone", {preValidation: [fastify.jwtauthentication], schema: schemas.catLeitorSchema},
    async (request: any, reply: any) => {
        return await catLeitor.getCatLeitor(request.query.cat_id);
    });

    fastify.get("/catleitor/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.catLeitorSchema},
    async (request: any, reply: any) => {
        return await catLeitor.getCatLeitores();
    });

    fastify.post("/catleitor/register", {preValidation: [fastify.jwtauthentication], schema: schemas.catLeitorBodySchema},
    async (request: any, reply: any) => {
        return await catLeitor.postCatLeitor(request.body as catLeitorModel);
    });

    fastify.put("/catleitor/update/:cat_id", {preValidation: [fastify.jwtauthentication], schema: schemas.catLeitorUpdateSchema},
    async (request: any, reply: any) => {
        return await catLeitor.updateCatLeitor(request.params.cat_id, request.body as catLeitorModel);
    });

    fastify.delete("/catleitor/delete/:cat_id", {preValidation: [fastify.jwtauthentication], schema: schemas.catLeitorDeleteSchema},
    async (request: any, reply: any) => {
        return await catLeitor.deleteCatLeitor(request.params.cat_id);
    });
}

const catLeitorRoutes = fastifyPlugin(catCustomerRoutes);
export {catLeitorRoutes};