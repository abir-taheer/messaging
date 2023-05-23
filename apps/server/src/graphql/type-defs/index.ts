import { query_typedef } from "./query";
import { subscription_typedef } from "@/graphql/type-defs/subscription";
import { mutation_typedef } from "@/graphql/type-defs/mutation";
import { typeDefs as scalar_typedefs } from "graphql-scalars";
import { user_typedef } from "@/graphql/type-defs/user";
import { authResponse_typedef } from "@/graphql/type-defs/auth-response";

export const typeDefs = [
  query_typedef,
  mutation_typedef,
  subscription_typedef,
  user_typedef,
  scalar_typedefs,
  authResponse_typedef,
];
