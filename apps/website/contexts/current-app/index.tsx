import { CurrentGlobalAppQuery, useCurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";

export interface CurrentAppProviderProps {
  readonly currentApp?: CurrentApp;
}

export type CurrentApp = CurrentGlobalAppQuery["currentApp"];
export interface CurrentAppProviderValues {
  readonly currentApp?: CurrentApp;
  readonly hasPaymentIntegrations: boolean;
  readonly isLoadingCurrentApp: boolean;
  readonly onReloadCurrentApp: () => void
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider = ({
  currentApp: currentAppProp,
  children,
}: PropsWithChildren<CurrentAppProviderProps>) => {
  const [currentApp, setCurrentApp] = useState<
    CurrentApp | undefined
  >(() => currentAppProp);

  const [{ fetching: isLoadingCurrentApp, data }, onExecuteReloadCurrentApp] =
    useCurrentGlobalAppQuery({
      pause: !!currentAppProp,
      requestPolicy: "network-only",
    });

  useEffect(() => {
    if (!!data?.currentApp) {
      setCurrentApp(data.currentApp);
    }
  }, [data]);

  useEffect(() => {
    setCurrentApp(currentAppProp);
  }, [currentAppProp]);

  const hasPaymentIntegrations = useMemo(
    () =>
      !!currentApp?.isIntegratedWithPagarme ||
      !!currentApp?.isIntegratedWithStripe ||
      !!currentApp?.isStokei,
    [currentApp]
  );
  const onReloadCurrentApp = useCallback(() => onExecuteReloadCurrentApp({ requestPolicy: 'network-only' }), [onExecuteReloadCurrentApp]);

  const values: CurrentAppProviderValues = useMemo(
    () => ({
      isLoadingCurrentApp,
      currentApp,
      hasPaymentIntegrations,
      onReloadCurrentApp
    }),
    [currentApp, hasPaymentIntegrations, isLoadingCurrentApp, onReloadCurrentApp]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
