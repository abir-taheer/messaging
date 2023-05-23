import { prisma } from "@/database/prisma";
import {
  AuthStatus,
  MutationResolvers,
  SuccessfulAuthResponse,
} from "@/generated/graphql";
import { ForbiddenError, UserInputError } from "apollo-server-errors";
import bcrypt from "bcrypt";

export const signUpWithPassword_resolver: MutationResolvers["signUpWithPassword"] =
  async (
    _,
    { firstName, lastName, phoneNumber, email, password },
    { isSignedIn, session }
  ) => {
    if (isSignedIn) {
      throw new ForbiddenError("You are already signed in.");
    }

    // All the string validation is done by the scalars in graphql
    // We just need to do some rule checks

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });

    if (existingUser) {
      throw new ForbiddenError(
        "An account with this email or phone number already exists"
      );
    }

    if (password.length < 10) {
      // TODO replace with a dedicated error class
      throw new Error("Password must be at least 10 characters");
    }

    const hasLowerCase = password.match(/[a-z]/);
    const hasUpperCase = password.match(/[A-Z]/);
    const hasNumber = password.match(/[0-9]/);

    if (!hasLowerCase || !hasUpperCase || !hasNumber) {
      throw new UserInputError(
        "Password must contain at least one uppercase, one lowercase letter, and one number"
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phoneNumber,
        email,
        passwordHash,
      },
    });

    session.userId = user.id;
    await session.save();

    const response: SuccessfulAuthResponse = {
      status: AuthStatus.Success,
      user,
    };

    return response;
  };
