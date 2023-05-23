import { ContextValue } from "@/graphql/context";
import { GraphQLResolveInfo } from "graphql";

type Props = {
  message: string;
  graphQLRequest?: {
    parent?: any;
    context?: ContextValue;
    info?: GraphQLResolveInfo;
  };
};

export class InternalError extends Error {
  graphQLRequest: Props["graphQLRequest"];
  message: string;

  constructor(props: Props) {
    super(props.message);
    this.graphQLRequest = props.graphQLRequest;
    this.message = props.message;

    // TODO report the error to an error reporting service
  }
}
