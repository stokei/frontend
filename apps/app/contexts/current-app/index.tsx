import { LoadingTransition } from "@stokei/ui";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { CurrentGlobalAppQuery } from "@/services/graphql/queries/current-app/current-app.query.graphql.generated";

export interface CurrentAppProviderProps {
  readonly currentApp?: CurrentApp;
  readonly isLoading: boolean;
}

export type CurrentApp = CurrentGlobalAppQuery["currentApp"];
export interface CurrentAppProviderValues {
  readonly currentApp?: CurrentApp;
  readonly isLoading: boolean;
}

export const CurrentAppContext = createContext({} as CurrentAppProviderValues);

export const CurrentAppProvider: FC<
  PropsWithChildren<CurrentAppProviderProps>
> = ({ isLoading, currentApp, children }) => {
  useEffect(() => {
    if (isLoading) {
      LoadingTransition.start();
    } else {
      LoadingTransition.done();
    }
  }, [isLoading]);

  const values: CurrentAppProviderValues = useMemo(
    () => ({
      isLoading,
      currentApp,
    }),
    [isLoading, currentApp]
  );

  return (
    <CurrentAppContext.Provider value={values}>
      {children}
    </CurrentAppContext.Provider>
  );
};
