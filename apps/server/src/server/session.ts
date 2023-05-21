import session from "express-session";
import { randomBytes } from "crypto";
import { getConfigValue } from "@/utils";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "@/database/prisma";

export const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000, //ms
  dbRecordIdIsSessionId: true,
});

let middleware: null | ReturnType<typeof session> = null;

const fallbackSecret = randomBytes(32).toString("hex");

export const sessionConfig: Parameters<typeof session>[0] = {
  name: "sid",
  secret: fallbackSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true },
  unset: "destroy",
};

export const getSessionMiddleware = async () => {
  if (middleware) {
    return middleware;
  }

  sessionConfig.secret = await getConfigValue("sessionSecret", fallbackSecret);

  if (process.env.NODE_ENV === "production") {
    sessionConfig.cookie = { ...sessionConfig.cookie, secure: true };
    sessionConfig.proxy = true;
  }

  middleware = session(sessionConfig);

  return middleware;
};
