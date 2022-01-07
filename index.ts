import Fastify, {FastifyInstance} from "fastify";
import {mongoConnector} from "./db/mongoConnector";
import {jwtConn} from "./middleware/auth_middleware_jwt";
import {loginRoutes} from "./routes/loginRoutes";
import {workerRoutes} from "./routes/workerRoutes";
import {readersRoutes} from "./routes/readersRoutes";
import {catReadersRoutes} from "./routes/catReaderRoutes";
import {booksRoutes} from "./routes/booksRoutes";
import {catBookRoutes} from "./routes/catBookRoutes";
import {reservRoutes} from "./routes/reservRoutes";
import {borrowRoutes} from "./routes/borrowRoutes";
import {devolutionRoutes} from "./routes/devolutionRoutes";
import {cors} from "./middleware/cors_middleware";
import {config} from "dotenv";
import "fastify-mongodb";
import "fastify-jwt";



config();
const server: FastifyInstance = Fastify({logger: true});
const swagger = require('./config/swagger');

server.register(require('fastify-jwt'), {secret: `${process.env.SECRET}`});
server.register(require('fastify-swagger'), swagger.options);

server.register(cors);
server.register(mongoConnector);
server.register(jwtConn);
server.register(loginRoutes);
server.register(workerRoutes);
server.register(readersRoutes);
server.register(catReadersRoutes);
server.register(booksRoutes);
server.register(catBookRoutes);
server.register(reservRoutes);
server.register(borrowRoutes);
server.register(devolutionRoutes)

const start = async () => {
  try {
    await server.listen(`${process.env.PORT}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start().then(v => {
  return v;
});
module.exports = server;