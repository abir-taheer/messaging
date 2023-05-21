import { MutationResolvers } from "@/generated/graphql";
import { passwordLoginStrategy } from "@/auth";

export const loginWithPassword_resolver: MutationResolvers["loginWithPassword"] =
  async (_, { email, password }, { session, isSignedIn }) => {
    if (isSignedIn) {
      // TODO update with a dedicated error class
      throw new Error("You are already signed in");
    }

    let user = null;

    try {
      user = await passwordLoginStrategy({ email, password });
    } catch (e) {
      // We can do some specific reporting or whatnot based on the error here in the future
      // TODO update with a dedicated error class
      throw new Error("Invalid email or password");
    }

    // Update the session and save it
    session.userId = user.id;
    session.save();

    return user;
  };
