import { AuthResponseResolvers } from "@/generated/graphql";
import { resolve_type_resolver } from "@/graphql/resolvers/auth-response/__resolve-type";

export const authResponse_resolvers: AuthResponseResolvers = {
  __resolveType: resolve_type_resolver,
};
