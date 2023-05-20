import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "@/graphql/type-defs";
import { printSchema } from "graphql";
import fs from "fs";

const schema = makeExecutableSchema({ typeDefs });

const fullSchema = printSchema(schema);

if (!fs.existsSync("src/generated")) {
  fs.mkdirSync("src/generated");
}

fs.writeFileSync("src/generated/schema.graphql", fullSchema);
