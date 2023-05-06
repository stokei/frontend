import { CodegenConfig } from "@graphql-codegen/cli";
import { STOKEI_API_GRAPHQL_URL } from "./environments";

const baseTypesPath = "services/graphql/stokei/index.tsx";

const config: CodegenConfig = {
  schema: STOKEI_API_GRAPHQL_URL,
  documents: "./**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    [baseTypesPath]: {
      plugins: ["typescript"],
    },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".graphql.generated.tsx",
        baseTypesPath,
      },
      plugins: ["typescript-operations", "typescript-urql"],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
