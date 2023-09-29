import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";
import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { getCookie } from "@stokei/graphql";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export type CurrentSite = CurrentGlobalAppQuery["site"];
export type CurrentApp = CurrentSite["app"];

export interface CurrentAppProviderProps {
  readonly baseURL: string;
  readonly currentApp?: CurrentApp;
  readonly currentSite?: CurrentSite;
}
export interface CurrentAppProviderValues {
  readonly baseURL: string;
  readonly currentSite?: CurrentSite;
  readonly currentApp?: CurrentApp;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ currentApp, currentSite, baseURL: baseURLProp, children }) => {
  const baseURL = useMemo(() => {
    if (baseURLProp) {
      return baseURLProp;
    }
    return getCookie(BASE_URL_HEADER_NAME) || "";
  }, [baseURLProp]);
  const values: CurrentAppProviderValues = useMemo(
    () => ({
      currentSite,
      currentApp,
      baseURL,
    }),
    [currentSite, currentApp, baseURL]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
