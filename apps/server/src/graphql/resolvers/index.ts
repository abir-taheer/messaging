import { query_resolvers } from "@/graphql/resolvers/query";
import { Resolvers } from "@/generated/graphql";

export const resolvers: Resolvers = {
  Query: query_resolvers,
};
