import { httpServer } from "@/server/http";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers, typeDefs } from "@/graphql";
import { webSocketServer } from "@/server/websocket";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
  buildContext,
  ContextValue,
  // RequestWithSession,
} from "@/graphql/context";
import { getSessionMiddleware } from "@/server/session";
import { Request, Response } from "express";

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
