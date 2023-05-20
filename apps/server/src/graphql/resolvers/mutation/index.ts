import { MutationResolvers } from "@/generated/graphql";
import { sendMessage_resolver } from "@/graphql/resolvers/mutation/sendMessage";

export const mutation_resolvers: MutationResolvers = {
  sendMessage: sendMessage_resolver,
};
