import fastifyPlugin from "fastify-plugin";

import {LivroService} from "../service/livroService";
import {LivroModel} from "../models/livroModel";

const schemas = require("../schemas/livroSchema");
const server = require("../index");

export async function bookRoutes(fastify: typeof server) {
    const livro: LivroService = new LivroService(fastify, "livro");

    fastify.get("/livro/findone", {preValidation: [fastify.jwtauthentication], schema: schemas.livroSchema},
    async (request: any, reply: any) => {
        return await livro.getLivro(request.query.isn_id);
    });

    fastify.get("/livro/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.livroSchema},
    async (request: any, reply: any) => {
        return await livro.getLivros();
    });
    
    fastify.post("/livro/register", {preValidation: [fastify.jwtauthentication], schema: schemas.livroBodySchema},
    async (request: any, reply: any) => {
        return await livro.postLivro(request.body as LivroModel);
    });

    fastify.put("/livro/update/:isn_id", {preValidation: [fastify.jwtauthentication], schema: schemas.livroUpdateSchema},
    async (request: any, reply: any) => {
        return await livro.updateLivro(request.params.isn_id, request.body as LivroModel);
    });

    fastify.delete("/livro/delete/:isn_id", {preValidation: [fastify.jwtauthentication], schema: schemas.livroDeleteSchema},
    async (request: any, reply: any) => {
        return await livro.deleteLivro(request.params.isn_id);
    });
}

const livroRoutes = fastifyPlugin(bookRoutes);
export {livroRoutes};