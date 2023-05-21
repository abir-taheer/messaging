import { httpServer } from "@/server/http";
import { WebSocketServer } from "ws";

export const webSocketServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
