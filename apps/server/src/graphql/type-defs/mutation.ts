import { graphql } from "@/utils/tags/graphql";

export const mutation_typedef = graphql`
  type Mutation {
    sendMessage(message: String!): String!
  }
`;
