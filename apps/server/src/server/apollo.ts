import { resolvers, typeDefs } from "@/graphql";
import { ContextValue, buildContext } from "@/graphql/context";
import { httpServer } from "@/server/http";
import { getSessionMiddleware } from "@/server/session";
import { webSocketServer } from "@/server/websocket";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Request, Response } from "express";
import { useServer } from "graphql-ws/lib/use/ws";

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const serverCleanup = useServer(
  {
    schema,
    onConnect: async (ctx) => {
      console.log(JSON.stringify(ctx.extra, null, 2));
    },
    onClose: async () => {
      console.log("closed");
    },
    context: async (ctx) => {
      const session = await getSessionMiddleware();

      let req = ctx.extra.request as unknown as Request;

      // we won't use this, but we need something to pass in
      const res = {} as Response;

      await new Promise((r) => session(req, res, r));

      return await buildContext({ req });
    },
  },
  webSocketServer
);

export const apolloServer = new ApolloServer<ContextValue>({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
