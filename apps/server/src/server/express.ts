import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import requestIp from "request-ip";
import { getSessionMiddleware } from "@/server/session";
import { expressMiddleware } from "@apollo/server/express4";
import { buildContext, ContextValue } from "@/graphql/context";
import { apolloServer } from "@/server/apollo";

export const expressApp = express();

export const applyMiddlewareToExpressApp = async () => {
  // Trust cloudflare proxy
  if (expressApp.get("env") === "production") {
    expressApp.set("trust proxy", 1);
  }

  expressApp.use(bodyParser.json());
  expressApp.use(cors({}));
  expressApp.use(requestIp.mw());

  const session = await getSessionMiddleware();
  expressApp.use(session);

  expressApp.use(
    "/graphql",
    expressMiddleware<ContextValue>(apolloServer, {
      context: buildContext,
    })
  );

  return expressApp;
};
