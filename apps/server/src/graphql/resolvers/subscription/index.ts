import { SubscriptionResolvers } from "@/generated/graphql";
import { greeting_resolver } from "@/graphql/resolvers/subscription/greeting";

export const subscription_resolvers: SubscriptionResolvers = {
  greeting: greeting_resolver,
};
