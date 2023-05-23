import { Request } from "express";
import { User } from "@prisma/client";
import { prisma } from "@/database/prisma";

type SessionAuthValue =
  | {
      userId: string;
      ipAddress: string;
    }
  | undefined;

export type RequestWithSession = Request & {
  session: Request["session"] & SessionAuthValue;
};

export type ContextValue = {
  req: RequestWithSession;
  session: RequestWithSession["session"];
  user: User | null;
  isSignedIn: boolean;
};

type BuildContextParams = {
  req: Request;
};
export const buildContext = async (
  ctx: BuildContextParams
): Promise<ContextValue> => {
  // Just for typescript to know what we're dealing with
  const req = ctx.req as RequestWithSession;

  let user = null;

  if (req.session.userId) {
    user = await prisma.user.findFirst({
      where: {
        id: req.session.userId,
      },
    });
  }

  const isSignedIn = Boolean(user);

  return { req, session: req.session, user, isSignedIn };
};
