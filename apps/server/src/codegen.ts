import type { CodegenConfig } from "@graphql-codegen/cli";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql";
import { printSchema } from "graphql";

const schema = makeExecutableSchema({ typeDefs });
const fullSchema = printSchema(schema);

const config: CodegenConfig = {
  overwrite: true,
  schema: fullSchema,
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
    "./src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
