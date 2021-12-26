import Fastify, {FastifyInstance} from "fastify";
import {mongoConnector} from "./db/mongoConnector";
import {jwtConn} from "./middleware/auth_middleware_jwt";
import {loginRoutes} from "./routes/loginRoutes";
import {leitorRoutes} from "./routes/leitorRoutes";
import {config} from "dotenv";
import "fastify-mongodb";
import "fastify-jwt";
import {cors} from "./middleware/cors_middleware";


config();
const server: FastifyInstance = Fastify({logger: true});
const swagger = require('./config/swagger');

server.register(require('fastify-jwt'), {
    secret: `${process.env.SECRET}`
});

server.register(mongoConnector);
server.register(jwtConn);
server.register(require('fastify-swagger'), swagger.options);
server.register(cors);
server.register(loginRoutes);
server.register(leitorRoutes);


const start = async () => {
    try {
        await server.listen(`${process.env.PORT}`);
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
};

start().then(v => {return v;});

module.exports = server;