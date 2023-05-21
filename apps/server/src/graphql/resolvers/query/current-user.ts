import { QueryResolvers } from "@/generated/graphql";

export const currentUser_resolver: QueryResolvers["currentUser"] = async (
  _,
  __,
  { user }
) => user;
