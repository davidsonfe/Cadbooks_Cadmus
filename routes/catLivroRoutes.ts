import fastifyPlugin from "fastify-plugin";

import {catLivroService} from "../service/catLivroService";
import {catLivroModel} from "../models/catLivroModel";

const schemas = require("../schemas/catLivroSchema");
const server = require("../index");

export async function catBookRoutes(fastify: typeof server) {
    const catLivro: catLivroService = new catLivroService(fastify, "catLivro");

    fastify.get("/catlivro/findone", {preValidation: [fastify.jwtauthentication], schema: schemas.catLivroSchema},
    async (request: any, reply: any) => {
        return await catLivro.getCatLivro(request.query.cat_id);
    });

    fastify.get("/catlivro/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.catLivroSchema},
    async (request: any, reply: any) => {
        return await catLivro.getCatLivros();
    });

    fastify.post("/catlivro/register", {preValidation: [fastify.jwtauthentication], schema: schemas.catLivroBodySchema},
    async (request: any, reply: any) => {
        return await catLivro.postCatLivro(request.body as catLivroModel);
    });

    fastify.put("/catlivro/update/:cat_id", {preValidation: [fastify.jwtauthentication], schema: schemas.catLivroUpdateSchema},
    async (request: any, reply: any) => {
        return await catLivro.updateCatLivro(request.params.cat_id, request.body as catLivroModel);
    });

    fastify.delete("/catlivro/delete/:cat_id", {preValidation: [fastify.jwtauthentication], schema: schemas.catLivroDeleteSchema},
    async (request: any, reply: any) => {
        return await catLivro.deleteCatLivro(request.params.cat_id);
    });
}

const catLivroRoutes = fastifyPlugin(catBookRoutes);
export {catLivroRoutes};