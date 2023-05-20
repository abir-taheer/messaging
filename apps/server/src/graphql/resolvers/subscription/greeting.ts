import { SubscriptionResolvers } from "@/generated/graphql";
import { pubsub } from "@/pubsub/apollo-pubsub";
import { PubSubAsyncIterator } from "graphql-redis-subscriptions/dist/pubsub-async-iterator";

export const greeting_resolver: SubscriptionResolvers["greeting"] = {
  subscribe: () =>
    pubsub.asyncIterator(["greeting"]) as PubSubAsyncIterator<string>,
};
