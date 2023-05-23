import { AuthResponseResolvers, AuthStatus } from "@/generated/graphql";
import { InternalError } from "@/utils/error/InternalError";

export const resolve_type_resolver: AuthResponseResolvers["__resolveType"] = (
  parent,
  context,
  info
) => {
  if (parent.status === AuthStatus.Failure) {
    return "FailedAuthResponse";
  }

  if (parent.status === AuthStatus.Success) {
    return "SuccessfulAuthResponse";
  }

  if (parent.status === AuthStatus.TwoFactorRequired) {
    return "TwoFactorRequiredAuthResponse";
  }

  throw new InternalError({
    message: "Unable to resolve the type for an AuthStatus",
    graphQLRequest: {
      parent,
      context,
      info,
    },
  });
};
