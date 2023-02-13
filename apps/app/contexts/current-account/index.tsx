import { CurrentAccountQuery } from "@/services/graphql/queries/current-account/current-account.query.graphql.generated";
import { createContext, FC, PropsWithChildren, useMemo } from "react";

export interface CurrentAccountProviderProps {
  readonly currentAccount?: CurrentAccount;
}

export type CurrentAccount = CurrentAccountQuery["me"];
export interface CurrentAccountProviderValues {
  readonly isAuthenticated?: boolean;
  readonly currentAccount?: CurrentAccount;
}

export const CurrentAccountContext = createContext(
  {} as CurrentAccountProviderValues
);

export const CurrentAccountProvider: FC<
  PropsWithChildren<CurrentAccountProviderProps>
> = ({ currentAccount, children }) => {
  const values: CurrentAccountProviderValues = useMemo(
    () => ({
      isAuthenticated: !!currentAccount,
      currentAccount,
    }),
    [currentAccount]
  );

  return (
    <CurrentAccountContext.Provider value={values}>
      {children}
    </CurrentAccountContext.Provider>
  );
};
