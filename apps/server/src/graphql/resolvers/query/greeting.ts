import { QueryResolvers } from "@/generated/graphql";

export const greeting_resolver: QueryResolvers["greeting"] = (_, { name }) => {
  return `Hello, ${name}!`;
};
