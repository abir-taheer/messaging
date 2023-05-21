import type { CodegenConfig } from "@graphql-codegen/cli";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql/type-defs";
import { printSchema } from "graphql";
import fs from "fs";

// First make a dump of the schema
const schema = makeExecutableSchema({ typeDefs });
const fullSchema = printSchema(schema);
if (!fs.existsSync("src/generated")) {
  fs.mkdirSync("src/generated");
}
fs.writeFileSync("src/generated/schema.graphql", fullSchema);

// Then return the config
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
