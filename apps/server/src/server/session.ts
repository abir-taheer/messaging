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

const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
export const sessionConfig: Parameters<typeof session>[0] = {
  secret: fallbackSecret,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge },
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
