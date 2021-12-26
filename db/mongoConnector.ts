import {FastifyInstance} from "fastify";
import fastifyMongodb from "fastify-mongodb";
import fastifyPlugin from "fastify-plugin";

async function dbConnector(fastify: FastifyInstance) {
    fastify.register(fastifyMongodb, {
        url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.lnbzh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    });
}

const mongoConnector = fastifyPlugin(dbConnector);
export {mongoConnector};