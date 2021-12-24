import Fastify, {FastifyInstance} from "fastify";
import {leitorRoutes} from "./routes/leitorRoutes";
import {config} from "dotenv";
import {mongoConnector} from "./db/mongoConnector";

config();
const server: FastifyInstance = Fastify({logger: true});
server.register(mongoConnector);
server.register(leitorRoutes);

const start = async () => {
  try {
    await server.listen(5000);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start().then(r => {
  return r;
});