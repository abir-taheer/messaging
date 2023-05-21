import type { CodegenConfig } from "@graphql-codegen/cli";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql";
import { printSchema } from "graphql";
import fs from "fs";

const schema = makeExecutableSchema({ typeDefs });
const fullSchema = printSchema(schema);

fs.writeFileSync("src/generated/schema.graphql", fullSchema);

const config: CodegenConfig = {
  overwrite: true,
  schema: fullSchema,
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "src/graphql/context#ContextValue",
      },
    },
    "./src/generated/graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
