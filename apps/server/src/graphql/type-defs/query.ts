import { graphql } from "@/utils/tags/graphql";

export const query_typedef = graphql`
  type Query {
    greeting(name: String!): String!

    currentUser: User
  }
`;
