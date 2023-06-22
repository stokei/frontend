import { BASE_URL_HEADER_NAME } from "@/constants/base-url-header-name";
import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";
import { getCookie } from "@stokei/graphql";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export interface CurrentAppProviderProps {
  readonly baseURL: string;
  readonly currentApp?: CurrentApp;
}

export type CurrentApp = CurrentGlobalAppQuery["currentApp"];
export interface CurrentAppProviderValues {
  readonly baseURL: string;
  readonly currentApp?: CurrentApp;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ currentApp, baseURL: baseURLProp, children }) => {
  const baseURL = useMemo(() => {
    if (baseURLProp) {
      return baseURLProp;
    }
    return getCookie(BASE_URL_HEADER_NAME) || "";
  }, [baseURLProp]);
  const values: CurrentAppProviderValues = useMemo(
    () => ({
      currentApp,
      baseURL,
    }),
    [currentApp, baseURL]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
