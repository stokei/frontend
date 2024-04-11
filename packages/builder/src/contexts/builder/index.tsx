import { createContext, PropsWithChildren, useMemo } from "react";
import { StokeiGraphQLClientProvider } from "@stokei/graphql";

export type BuilderProviderRoutes = {
  customPage: (data: { page: string; slug: string }) => string;
  product: (data: { product: string; price?: string }) => string;
  store: (data: { catalog: string }) => string;
};

export interface BuilderProviderProps {
  readonly stokeiGraphQLApi: any;
  readonly routes: BuilderProviderRoutes;
}

export interface BuilderProviderValues {
  readonly stokeiGraphQLApi: any;
  readonly routes: BuilderProviderRoutes;
}

export const BuilderContext = createContext({} as BuilderProviderValues);

export const BuilderProvider = ({
  stokeiGraphQLApi,
  children,
  routes,
}: PropsWithChildren<BuilderProviderProps>) => {
  const values: BuilderProviderValues = useMemo(
    () => ({
      routes,
      stokeiGraphQLApi,
    }),
    [routes, stokeiGraphQLApi]
  );

  return (
    <BuilderContext.Provider value={values}>
      <StokeiGraphQLClientProvider value={stokeiGraphQLApi}>
        {children}
      </StokeiGraphQLClientProvider>
    </BuilderContext.Provider>
  );
};
