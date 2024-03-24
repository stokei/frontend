import { createContext, PropsWithChildren, useMemo } from "react";
import { StokeiGraphQLClientProvider } from "@stokei/graphql";

export interface BuilderProviderProps {
  readonly stokeiGraphQLApi: any;
}

export interface BuilderProviderValues {
  readonly stokeiGraphQLApi: any;
}

export const BuilderContext = createContext({} as BuilderProviderValues);

export const BuilderProvider = ({
  stokeiGraphQLApi,
  children,
}: PropsWithChildren<BuilderProviderProps>) => {
  const values: BuilderProviderValues = useMemo(
    () => ({
      stokeiGraphQLApi,
    }),
    [stokeiGraphQLApi]
  );

  return (
    <BuilderContext.Provider value={values}>
      <StokeiGraphQLClientProvider value={stokeiGraphQLApi}>
        {children}
      </StokeiGraphQLClientProvider>
    </BuilderContext.Provider>
  );
};
