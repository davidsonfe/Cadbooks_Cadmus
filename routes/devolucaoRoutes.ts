
import {DevolucaoService} from "../service/devolucaoService";
import {DevolucaoModel} from "../models/devolucaoModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/devolucaoSchema");
const server = require("../index");

export async function devolutionRoutes(fastify: typeof server) {
    const devolucao: DevolucaoService = new DevolucaoService(fastify, "devolucao");

    fastify.get("/devolucao/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoSchema},
        async (request: any, reply: any) => {
            try {
                return await devolucao.getDevolucoes();
            } catch (error) {
                reply.code(500).send({ message: error});
            }         
        });

    fastify.get("/devolucao/findone/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucoesSchema},
        async (request: any, reply: any) => {
            try {
                const result = await devolucao.getDevolucao(request.params.id_obracop);
                if(result){
                    return reply.send(result);
                }
                
                reply.code(404).send({ message: 'devolução não encontrada'});
            } catch (error) {
                reply.code(500).send({ message: error});
            }

        });

    fastify.post("/devolucao/register", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoBodySchema},
        async (request: any, reply: any) => {
            try {
                return await devolucao.postDevolucao(request.body as DevolucaoModel);
            } catch (error) {
                reply.code(500).send({ message: error});
            }
        });

    fastify.put("/devolucao/update/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoUpdateSchema},
        async (request: any, reply: any) => {
            try {

                const result = await devolucao.getDevolucao(request.params.id_obracop);

                if(result){
                    return await devolucao.updateDevolucao(request.params.id_obracop, request.body as DevolucaoModel);
                }

                reply.code(404).send({ message: 'devolução não encontrada'});
                
            } catch (error) {
                reply.code(500).send({ message: error});
            }
            
        });

    fastify.delete("/devolucao/delete/:id_obracop", {preValidation: [fastify.jwtauthentication], schema: schemas.devolucaoDeleteSchema},
        async (request: any, reply: any) => {
            try {
                
                const result = await devolucao.getDevolucao(request.params.id_obracop);

                if(result){
                    return await devolucao.deleteDevolucao(request.params.id_obracop);
                }

                reply.code(404).send({ message: 'devolução não encontrada'});

            } catch (error) {
                reply.code(500).send({ message: error});
            }

        });
}

const DevolucaoRoutes = fastifyPlugin(devolutionRoutes);
export {DevolucaoRoutes};