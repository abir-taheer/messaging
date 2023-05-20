import type { CodegenConfig } from "@graphql-codegen/cli";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql";
import { printSchema } from "graphql";
import { existsSync, mkdirSync, writeFileSync } from "fs";

const schema = makeExecutableSchema({ typeDefs });

const fullSchema = printSchema(schema);

if (!existsSync("src/generated")) {
  mkdirSync("src/generated");
}

writeFileSync("src/generated/schema.graphql", fullSchema);

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/generated/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
