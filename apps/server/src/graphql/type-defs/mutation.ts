import { graphql } from "@/utils/tags/graphql";

export const mutation_typedef = graphql`
  type Mutation {
    sendMessage(message: String!): String!

    loginWithPassword(email: String!, password: String!): User!

    signUpWithPassword(
      firstName: NonEmptyString!
      lastName: NonEmptyString!
      phoneNumber: PhoneNumber!
      email: EmailAddress!
      password: NonEmptyString!
    ): User!

    logout: Boolean!
  }
`;
