import { RoleName } from "@/constants/role-names";
import {
  CurrentAccountQuery,
  useCurrentAccountQuery,
} from "@/services/graphql/queries/current-account/current-account.query.graphql.generated";
import { getDashboardHomePageURL } from "@/utils";
import {
  createContext,
  PropsWithChildren,
  useCallback,
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
  readonly hasSomeRole?: (roleNames: RoleName[]) => boolean;
  readonly onReloadCurrentAccount: () => void;
}

export const CurrentAccountContext = createContext(
  {} as CurrentAccountProviderValues
);

export const CurrentAccountProvider = ({
  currentAccount: currentAccountProp,
  children,
}: PropsWithChildren<CurrentAccountProviderProps>) => {
  const [currentAccount, setCurrentAccount] = useState<
    CurrentAccount | undefined
  >();

  const [{ fetching: isLoading, data }, onReloadCurrentAccount] =
    useCurrentAccountQuery({
      pause: !!currentAccountProp,
      requestPolicy: "cache-and-network",
    });

  const hasSomeRole = useCallback(
    (roleNames: RoleName[]) => {
      const hasRole = roleNames.some((roleName) => {
        return currentAccount?.roles?.items?.map(
          (role) => role.name === roleName
        );
      });

      return hasRole;
    },
    [currentAccount]
  );

  const homePageURL = useMemo(
    () =>
      getDashboardHomePageURL({
        isAdmin: false,
      }),
    []
  );

  useEffect(() => {
    if (!!data?.me) {
      setCurrentAccount(data.me);
    }
  }, [data]);

  useEffect(() => {
    setCurrentAccount(currentAccountProp);
  }, [currentAccountProp]);

  const onReloadAccount = useCallback(
    () => onReloadCurrentAccount({ requestPolicy: "network-only" }),
    [onReloadCurrentAccount]
  );

  const values: CurrentAccountProviderValues = useMemo(
    () => ({
      isAuthenticated: !!currentAccount,
      currentAccount,
      isLoading,
      homePageURL,
      hasSomeRole,
      onReloadCurrentAccount: onReloadAccount,
    }),
    [currentAccount, isLoading, homePageURL, hasSomeRole, onReloadAccount]
  );

  return (
    <CurrentAccountContext.Provider value={values}>
      {children}
    </CurrentAccountContext.Provider>
  );
};
