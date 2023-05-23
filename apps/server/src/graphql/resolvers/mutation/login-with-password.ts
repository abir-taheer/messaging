import { passwordLoginStrategy } from "@/auth";
import {
  AuthStatus,
  FailedAuthResponse,
  MutationResolvers,
  SuccessfulAuthResponse,
} from "@/generated/graphql";
import { ForbiddenError } from "apollo-server-errors";

const InvalidCredentialsResponse: FailedAuthResponse = {
  message: "Invalid email or password",
  status: AuthStatus.Failure,
};

export const loginWithPassword_resolver: MutationResolvers["loginWithPassword"] =
  async (_, { email, password }, { req, isSignedIn }) => {
    if (isSignedIn) {
      throw new ForbiddenError("You are already signed in");
    }

    let user = null;

    try {
      user = await passwordLoginStrategy({ email, password });
    } catch (e) {
      return InvalidCredentialsResponse;
    }

    // Update the session and save it
    req.session.userId = user.id;
    req.session.save();

    const response: SuccessfulAuthResponse = {
      status: AuthStatus.Success,
      user,
    };

    return response;
  };
