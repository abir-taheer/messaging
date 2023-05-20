import { RedisPubSub } from "graphql-redis-subscriptions";
import { publisher, subscriber } from "./redis";

export const pubsub = new RedisPubSub({
  publisher,
  subscriber,
});
