// import { createServer } from "http";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "@/graphql";

export const app = express();
// const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });
// ...
export const server = new ApolloServer({
  schema,
});
