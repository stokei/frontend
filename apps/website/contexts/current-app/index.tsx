import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export interface CurrentAppProviderProps {
  readonly currentApp?: CurrentApp;
}

export type CurrentApp = CurrentGlobalAppQuery["currentApp"];
export interface CurrentAppProviderValues {
  readonly currentApp?: CurrentApp;
  readonly hasPaymentIntegrations: boolean;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ currentApp, children }) => {
  const hasPaymentIntegrations = useMemo(
    () =>
      !!currentApp?.isIntegratedWithStripe ||
      !!currentApp?.isIntegratedWithPix ||
      !!currentApp?.isStokei,
    [currentApp]
  );

  const values: CurrentAppProviderValues = useMemo(
    () => ({
      currentApp,
      hasPaymentIntegrations,
    }),
    [currentApp, hasPaymentIntegrations]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
