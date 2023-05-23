import { graphql } from "@/utils";

export const authResponse_typedef = graphql`
  enum AuthStatus {
    SUCCESS
    FAILURE
    TWO_FACTOR_REQUIRED
  }

  enum TwoFactorStrategy {
    EMAIL
    SMS
    TOTP
    U2F
  }

  type SuccessfulAuthResponse {
    status: AuthStatus!
    user: User!
  }

  type FailedAuthResponse {
    status: AuthStatus!
    message: String!
  }

  type TwoFactorRequiredAuthResponse {
    status: AuthStatus!
    continueToken: String!
    availableStrategies: [TwoFactorStrategy!]!
  }

  union AuthResponse =
      SuccessfulAuthResponse
    | FailedAuthResponse
    | TwoFactorRequiredAuthResponse
`;
