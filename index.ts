import Fastify, {FastifyInstance} from "fastify";
import {mongoConnector} from "./db/mongoConnector";
import {jwtConn} from "./middleware/auth_middleware_jwt";
import {loginRoutes} from "./routes/loginRoutes";
import {funcionarioRoutes} from "./routes/funcionarioRoutes";
import {leitorRoutes} from "./routes/leitorRoutes";
import {config} from "dotenv";
import "fastify-mongodb";
import "fastify-jwt";
import { reservaRoutes } from "./routes/reservaRoutes";
import { livroRoutes } from "./routes/livroRoutes";
import { emprestimoRoutes } from "./routes/emprestimoRoutes";
import { devolutionRoutes } from "./routes/devolucaoRoutes";

config();

const server: FastifyInstance = Fastify({logger: true});
const swagger = require('./config/swagger');
server.register(require('fastify-cors'), {
    origin: '*',
});
server.register(require('fastify-jwt'), {
    secret: `${process.env.SECRET}`
});

server.register(mongoConnector);
server.register(jwtConn);
server.register(require('fastify-swagger'), swagger.options);
server.register(loginRoutes);
server.register(funcionarioRoutes);
server.register(leitorRoutes);
server.register(reservaRoutes);
server.register(livroRoutes);
server.register(emprestimoRoutes);
server.register(devolutionRoutes)

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