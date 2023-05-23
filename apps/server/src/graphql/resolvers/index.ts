import { Resolvers } from "@/generated/graphql";
import { authResponse_resolvers } from "@/graphql/resolvers/auth-response";
import { mutation_resolvers } from "@/graphql/resolvers/mutation";
import { query_resolvers } from "@/graphql/resolvers/query";
import { subscription_resolvers } from "@/graphql/resolvers/subscription";
import { resolvers as scalar_resolvers } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: query_resolvers,
  Subscription: subscription_resolvers,
  Mutation: mutation_resolvers,
  AuthResponse: authResponse_resolvers,
  ...scalar_resolvers,
};
