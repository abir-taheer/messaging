import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@/graphql/type-defs";
import { resolvers } from "@/graphql/resolvers";

export const schema = makeExecutableSchema({ typeDefs, resolvers });
