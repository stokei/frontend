import { createContext, PropsWithChildren, useMemo } from "react";
import { StokeiGraphQLClientProvider } from "@stokei/graphql";

export interface BuilderProviderProps {
  readonly stokeiGraphQLApi: any;
  readonly getCustomPageURL: (data: { pageId: string; slug: string }) => string;
}

export interface BuilderProviderValues {
  readonly stokeiGraphQLApi: any;
  readonly getCustomPageURL: (data: { pageId: string; slug: string }) => string;
}

export const BuilderContext = createContext({} as BuilderProviderValues);

export const BuilderProvider = ({
  stokeiGraphQLApi,
  getCustomPageURL,
  children,
}: PropsWithChildren<BuilderProviderProps>) => {
  const values: BuilderProviderValues = useMemo(
    () => ({
      getCustomPageURL,
      stokeiGraphQLApi,
    }),
    [getCustomPageURL, stokeiGraphQLApi]
  );

  return (
    <BuilderContext.Provider value={values}>
      <StokeiGraphQLClientProvider value={stokeiGraphQLApi}>
        {children}
      </StokeiGraphQLClientProvider>
    </BuilderContext.Provider>
  );
};
