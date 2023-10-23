import { createContext, FC, PropsWithChildren, useMemo } from "react";
import { StokeiGraphQLClientProvider } from "@stokei/graphql";

export interface BuilderProviderProps {
  readonly stokeiGraphQLApi: any;
}

export interface BuilderProviderValues {
  readonly stokeiGraphQLApi: any;
}

export const BuilderContext = createContext({} as BuilderProviderValues);

export const BuilderProvider: FC<PropsWithChildren<BuilderProviderProps>> = ({
  stokeiGraphQLApi,
  children,
}) => {
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
