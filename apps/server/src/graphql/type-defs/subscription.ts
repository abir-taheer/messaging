import { graphql } from "@/utils/tags/graphql";

export const subscription_typedef = graphql`
  type Subscription {
    greeting(name: String!): String!
  }
`;
