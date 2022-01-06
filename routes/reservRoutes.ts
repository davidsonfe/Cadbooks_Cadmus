import {ReservService} from "../service/reservService";
import {ReservModel} from "../models/reservModel";
import fastifyPlugin from "fastify-plugin";

const schemas = require("../schemas/reservSchema");
const server = require("../index");

export async function reserveRoutes(fastify: typeof server) {
  const reserv: ReservService = new ReservService(fastify, "reserva", "livros");

  fastify.get("/reserv/findall", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.reservSchema
    },
    async (request: any, reply: any) => {
      try {
        const reservs = await reserv.getReservs();
        if (Array.isArray(reservs) && reservs.length > 0) {
          for (let i = 0; i < reservs.length; i++) {
            reservs[i].dt_reserva = reservs[i].dt_reserva.toLocaleDateString("pt-BR");
            reservs[i].dt_ret = reservs[i].dt_ret.toLocaleDateString("pt-BR");
            reservs[i].dt_devol = reservs[i].dt_devol.toLocaleDateString("pt-BR");
          }
          return reservs;
        }
        reply.status(404).send({msg: "Nenhuma reserva encontrada."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.get("/reserv/findone/:id_reserva", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.reservSchema
    },
    async (request: any, reply: any) => {
      try {
        const reserva =  await reserv.getReserv(request.params.id_reserva);
        if (Array.isArray(reserva) && reserva.length > 0) {
            reserva[0].dt_reserva = reserva[0].dt_reserva.toLocaleDateString("pt-BR");
            reserva[0].dt_ret = reserva[0].dt_ret.toLocaleDateString("pt-BR");
            reserva[0].dt_devol = reserva[0].dt_devol.toLocaleDateString("pt-BR");
            return reserva;
        }
        reply.status(404).send({msg: "Reserva não encontrada."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.post("/reserv/register", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.reservBodySchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await reserv.postReserv(request.body as ReservModel);
        if (verify)
          return reply.status(200).send({msg: "Reserva efetuada."});
        reply.status(400).send({msg: "Não há obra disponível no período solicitado."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });

  fastify.delete("/reserv/delete/:id_reserva", {
      preValidation: [fastify.jwtauthentication],
      schema: schemas.reservDeleteSchema
    },
    async (request: any, reply: any) => {
      try {
        const verify = await reserv.deleteReserv(request.params.id_reserva);
        if (verify)
          return reply.status(200).send({msg: "Reserva removida."});
        reply.status(400).send({msg: "Verique os campos e tente novamente."});
      } catch (err) {
        reply.status(500).send({err});
      }
    });
}

const reservRoutes = fastifyPlugin(reserveRoutes);
export {reservRoutes};