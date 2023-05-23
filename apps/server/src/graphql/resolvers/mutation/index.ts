import { MutationResolvers } from "@/generated/graphql";
import { loginWithPassword_resolver } from "@/graphql/resolvers/mutation/login-with-password";
import { logout_resolver } from "@/graphql/resolvers/mutation/logout";
import { sendMessage_resolver } from "@/graphql/resolvers/mutation/send-message";
import { signUpWithPassword_resolver } from "@/graphql/resolvers/mutation/sign-up-with-password";

export const mutation_resolvers: MutationResolvers = {
  sendMessage: sendMessage_resolver,
  loginWithPassword: loginWithPassword_resolver,
  logout: logout_resolver,
  signUpWithPassword: signUpWithPassword_resolver,
};
