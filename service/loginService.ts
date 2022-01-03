import "fastify-mongodb";
import "fastify-jwt";

const bcrypt = require("bcrypt");
const server = require("../index");

export class LoginService {
  collection;
  server;

  constructor(fastify: typeof server, collection: string) {
    if (fastify.mongo.db) {
      this.collection = fastify.mongo.db.collection(collection);
      this.server = fastify;
     }
  }

  async logIn(user: string, pass: string) {
    try {
      if (this.collection) {
        const us = await this.collection.find({cpf: user}).toArray();
        if (Array.isArray(us) && us.length > 0) {
          if (await bcrypt.compare(pass, us[0].passwd)) {
            const token = this.server.jwt.sign({user, pass}, {expiresIn: 32800});
            await this.collection.updateOne({cpf:user} ,{ $set: {token} });
            return await this.collection.find({cpf: user}).project({_id:0, passwd:0, dt_nasc:0}).toArray();
          }
          return false;
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserContext(token: string) {
    try {
      if (this.collection) {
        const user = await this.collection.find({token: token}).project({_id:0, passwd:0, dt_nasc:0}).toArray();
        if (Array.isArray(user) && user.length > 0)
          return user;
      }
    } catch (error) {
      throw error;
    }
  }
}