
import {ReservaService} from "../service/reservaService";
import {ReservaModel} from "../models/reservaModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/reservaSchema");
const server = require("../index");

export async function customerRoutes(fastify: typeof server) {
    const reserva: ReservaService = new ReservaService(fastify, "reserva");

    fastify.get("/reserva/findall", {preValidation: [fastify.jwtauthentication], schema: schemas.reservaSchema},
        async (request: any, reply: any) => {
            return await reserva.getReservas();
        });

    fastify.get("/reserva/findone/:id_reserva", {preValidation: [fastify.jwtauthentication], schema: schemas.reservaSchema},
        async (request: any, reply: any) => {
            return await reserva.getReserva(request.params.id_reserva);
        });

    fastify.post("/reserva/register", {preValidation: [fastify.jwtauthentication], schema: schemas.reservaBodySchema},
        async (request: any, reply: any) => {
            return await reserva.postReserva(request.body as ReservaModel);
        });

    fastify.put("/reserva/update/:id_reserva", {preValidation: [fastify.jwtauthentication], schema: schemas.reservaUpdateSchema},
        async (request: any, reply: any) => {
            return await reserva.updateReserva(request.params.id_reserva, request.body as ReservaModel);
        });

    fastify.delete("/reserva/delete/:id_reserva", {preValidation: [fastify.jwtauthentication], schema: schemas.reservaDeleteSchema},
        async (request: any, reply: any) => {
            return await reserva.deleteReserva(request.params.id_reserva);
        });
}

const reservaRoutes = fastifyPlugin(customerRoutes);
export {reservaRoutes};