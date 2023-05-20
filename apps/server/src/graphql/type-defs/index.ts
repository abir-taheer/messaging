import { query_typedef } from "./query";
import { subscription_typedef } from "@/graphql/type-defs/subscription";
import { mutation_typedef } from "@/graphql/type-defs/mutation";

export const typeDefs = [query_typedef, mutation_typedef, subscription_typedef];
