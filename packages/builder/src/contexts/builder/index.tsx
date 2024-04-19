import { createContext, PropsWithChildren, useMemo } from "react";
import { StokeiGraphQLClientProvider } from "@stokei/graphql";

export type BuilderProviderRoutes = {
  customPage: (data: { page: string; slug: string }) => string;
  product: (data: { product: string; price?: string }) => string;
  store: (data: { catalog: string }) => string;
};

export interface BuilderProviderProps {
  readonly siteId: string;
  readonly stokeiGraphQLApi: any;
  readonly routes: BuilderProviderRoutes;
}

export interface BuilderProviderValues {
  readonly siteId: string;
  readonly stokeiGraphQLApi: any;
  readonly routes: BuilderProviderRoutes;
}

export const BuilderContext = createContext({} as BuilderProviderValues);

export const BuilderProvider = ({
  siteId,
  stokeiGraphQLApi,
  children,
  routes,
}: PropsWithChildren<BuilderProviderProps>) => {
  const values: BuilderProviderValues = useMemo(
    () => ({
      siteId,
      routes,
      stokeiGraphQLApi,
    }),
    [routes, siteId, stokeiGraphQLApi]
  );

  return (
    <BuilderContext.Provider value={values}>
      <StokeiGraphQLClientProvider value={stokeiGraphQLApi}>
        {children}
      </StokeiGraphQLClientProvider>
    </BuilderContext.Provider>
  );
};
