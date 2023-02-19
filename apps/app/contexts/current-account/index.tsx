import {
  CurrentAccountQuery,
  useCurrentAccountQuery,
} from "@/services/graphql/queries/current-account/current-account.query.graphql.generated";
import { getDashboardHomePageURL } from "@/utils";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CurrentAccount = CurrentAccountQuery["me"];

export interface CurrentAccountProviderProps {
  readonly currentAccount?: CurrentAccount;
}

export interface CurrentAccountProviderValues {
  readonly homePageURL?: string;
  readonly isAuthenticated?: boolean;
  readonly isLoading?: boolean;
  readonly currentAccount?: CurrentAccount;
}

export const CurrentAccountContext = createContext(
  {} as CurrentAccountProviderValues
);

export const CurrentAccountProvider: FC<
  PropsWithChildren<CurrentAccountProviderProps>
> = ({ currentAccount: currentAccountProp, children }) => {
  const [currentAccount, setCurrentAccount] = useState<
    CurrentAccount | undefined
  >(currentAccountProp);

  const [{ fetching: isLoading, data }] = useCurrentAccountQuery({
    pause: !!currentAccountProp,
  });

  const homePageURL = useMemo(
    () => getDashboardHomePageURL({ isAdmin: !!currentAccount?.isAdmin }),
    [currentAccount]
  );

  useEffect(() => {
    if (!!data?.me) {
      setCurrentAccount(data.me);
    }
  }, [data]);

  const values: CurrentAccountProviderValues = useMemo(
    () => ({
      isAuthenticated: !!currentAccount,
      currentAccount,
      isLoading,
      homePageURL,
    }),
    [currentAccount, homePageURL, isLoading]
  );

  return (
    <CurrentAccountContext.Provider value={values}>
      {children}
    </CurrentAccountContext.Provider>
  );
};
