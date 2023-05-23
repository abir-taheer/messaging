import { graphql } from "@/utils/tags/graphql";

export const mutation_typedef = graphql`
  type Mutation {
    sendMessage(message: String!): String!

    loginWithPassword(email: String!, password: String!): AuthResponse!

    signUpWithPassword(
      firstName: NonEmptyString!
      lastName: NonEmptyString!
      phoneNumber: PhoneNumber!
      email: EmailAddress!
      password: NonEmptyString!
    ): AuthResponse!

    logout: Boolean!
  }
`;
