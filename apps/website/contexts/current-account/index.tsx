import { RoleName } from "@/constants/role-names";
import {
  CurrentAccountQuery,
  useCurrentAccountQuery,
} from "@/services/graphql/queries/current-account/current-account.query.graphql.generated";
import {
  createContext,
  FC,
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
  readonly isAuthenticated?: boolean;
  readonly isLoading?: boolean;
  readonly currentAccount?: CurrentAccount;
  readonly hasSomeRole?: (roleNames: RoleName[]) => boolean;
}

export const CurrentAccountContext = createContext(
  {} as CurrentAccountProviderValues
);

export const CurrentAccountProvider: FC<
  PropsWithChildren<CurrentAccountProviderProps>
> = ({ currentAccount: currentAccountProp, children }) => {
  const [currentAccount, setCurrentAccount] = useState<
    CurrentAccount | undefined
  >();

  const [{ fetching: isLoading, data }] = useCurrentAccountQuery({
    pause: !!currentAccountProp,
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

  useEffect(() => {
    if (!!data?.me) {
      setCurrentAccount(data.me);
    }
  }, [data]);

  useEffect(() => {
    setCurrentAccount(currentAccountProp);
  }, [currentAccountProp]);

  const values: CurrentAccountProviderValues = useMemo(
    () => ({
      isAuthenticated: !!currentAccount,
      currentAccount,
      isLoading,
      hasSomeRole,
    }),
    [currentAccount, isLoading, hasSomeRole]
  );

  return (
    <CurrentAccountContext.Provider value={values}>
      {children}
    </CurrentAccountContext.Provider>
  );
};
