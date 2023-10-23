import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export type CurrentSite = CurrentGlobalAppQuery["site"];
export type CurrentApp = CurrentSite["app"];

export interface CurrentAppProviderProps {
  readonly currentApp?: CurrentApp;
  readonly currentSite?: CurrentSite;
}
export interface CurrentAppProviderValues {
  readonly currentSite?: CurrentSite;
  readonly currentApp?: CurrentApp;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ currentApp, currentSite, children }) => {
  const values: CurrentAppProviderValues = useMemo(
    () => ({
      currentSite,
      currentApp,
    }),
    [currentSite, currentApp]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
