import { MutationResolvers } from "@/generated/graphql";
import { promisify } from "util";

export const logout_resolver: MutationResolvers["logout"] = async (
  _,
  __,
  { req, isSignedIn }
) => {
  if (!isSignedIn) {
    // TODO replace with a dedicated error class
    throw new Error("You are not signed in");
  }

  // Promisify => bind 'this' keyword to original object => call function
  await promisify(req.session.destroy).bind(req.session)();

  return true;
};
