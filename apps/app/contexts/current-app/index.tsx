import { LoadingTransition } from "@stokei/ui";
import { createContext, FC, PropsWithChildren, useEffect } from "react";
import {
  CurrentAppQuery,
  useCurrentAppQuery,
} from "./current-app.query.graphql.generated";

export interface CurrentAppProviderProps {}

export type CurrentApp = CurrentAppQuery["currentApp"];
export interface CurrentAppProviderValues {
  readonly currentApp?: CurrentApp;
  readonly isLoading: boolean;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ children }) => {
  const [{ fetching: isLoading, data: dataCurrentAppQuery }] =
    useCurrentAppQuery();

  useEffect(() => {
    if (isLoading) {
      LoadingTransition.start();
    } else {
      LoadingTransition.done();
    }
  }, [isLoading]);

  const values: CurrentAppProviderValues = {
    isLoading,
    currentApp: dataCurrentAppQuery?.currentApp,
  };
  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
