import { MutationResolvers } from "@/generated/graphql";
import { pubsub } from "@/pubsub/apollo-pubsub";

export const sendMessage_resolver: MutationResolvers["sendMessage"] = async (
  _,
  { message }
) => {
  await pubsub.publish("greeting", { greeting: message });
  return message;
};
