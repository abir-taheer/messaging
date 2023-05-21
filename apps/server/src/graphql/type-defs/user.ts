import { graphql } from "@/utils";

export const user_typedef = graphql`
  type User {
    id: ID!

    firstName: String!
    lastName: String!

    phoneNumber: PhoneNumber!
    email: EmailAddress!
  }
`;
