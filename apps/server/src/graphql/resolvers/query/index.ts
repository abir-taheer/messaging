import { greeting_resolver } from "@/graphql/resolvers/query/greeting";
import { QueryResolvers } from "@/generated/graphql";

export const query_resolvers: QueryResolvers = {
  greeting: greeting_resolver,
};
