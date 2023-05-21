import { expressApp } from "@/server/express";
import { createServer } from "http";

export const httpServer = createServer(expressApp);
