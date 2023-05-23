import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/type-defs";
import { makeExecutableSchema } from "@graphql-tools/schema";

export const schema = makeExecutableSchema({ typeDefs, resolvers });
