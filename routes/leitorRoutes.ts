import {FastifyInstance} from "fastify";
import {LeitorService} from "../service/leitorService";
import {LeitorDTO} from "../dto/leitor.dto";


export async function leitorRoutes(fastify: FastifyInstance) {
  const leitor: LeitorService = new LeitorService(fastify, "leitor");

  fastify.get("/", async (req, res) => {
    return leitor.getLeitores();
  });

  fastify.get("/:email", async (req, res) => {
    const {email} = req.params as { email: string };
    return leitor.getLeitor(email);
  });

  fastify.post("/", async (req, rep) => {
    return leitor.postLeitor(req.body as LeitorDTO);
  });

  fastify.put("/:email", async (req, rep) => {
    const {email} = req.params as { email: string };
    return leitor.updateLeitor(email, req.body as LeitorDTO);
  });

  fastify.delete("/:email", async (req, rep) => {
    const {email} = req.params as { email: string };
    await leitor.deleteLeitor(email);
    return {};
  });
}
