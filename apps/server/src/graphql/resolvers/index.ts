import { query_resolvers } from "@/graphql/resolvers/query";
import { Resolvers } from "@/generated/graphql";
import { subscription_resolvers } from "@/graphql/resolvers/subscription";
import { mutation_resolvers } from "@/graphql/resolvers/mutation";
import { authResponse_resolvers } from "@/graphql/resolvers/auth-response";
import { resolvers as scalar_resolvers } from "graphql-scalars";

export const resolvers: Resolvers = {
  Query: query_resolvers,
  Subscription: subscription_resolvers,
  Mutation: mutation_resolvers,
  AuthResponse: authResponse_resolvers,
  ...scalar_resolvers,
};
