import { expressMiddleware } from "@as-integrations/express5";
import { resolvers, typeDefs } from "./graphql/schema.js";
import { ApolloServer } from "@apollo/server";
import express from "express";
import cors from "cors";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  // 1. Inicializar Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // 2. Configurar middlewares de Express
  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor GraphQL listo en http://localhost:${PORT}/graphql`,
    );
  });
}

startServer();
