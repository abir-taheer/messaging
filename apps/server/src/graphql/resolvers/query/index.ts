import { QueryResolvers } from "@/generated/graphql";
import { currentUser_resolver } from "@/graphql/resolvers/query/current-user";
import { greeting_resolver } from "@/graphql/resolvers/query/greeting";

export const query_resolvers: QueryResolvers = {
  greeting: greeting_resolver,
  currentUser: currentUser_resolver,
};
