import { prisma } from "@/database/prisma";
import bcrypt from "bcrypt";

export type PasswordParams = {
  email: string;
  password: string;
};

export const passwordLoginStrategy = async ({
  email,
  password,
}: PasswordParams) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordIsValid) {
    throw new Error("Password is not valid");
  }

  return user;
};
