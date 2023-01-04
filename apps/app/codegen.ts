import { CodegenConfig } from "@graphql-codegen/cli";
import { STOKEI_API_GRAPHQL_URL } from "./environments";

const config: CodegenConfig = {
  schema: STOKEI_API_GRAPHQL_URL,
  documents: ["./services/graphql/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "services/graphql/stokei/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
    },
  },
};

export default config;
