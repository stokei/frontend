import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCurrentAppFinancialQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCurrentAppFinancialQuery = { __typename?: 'Query', currentApp: { __typename?: 'App', id: string, balances?: Array<{ __typename?: 'Balance', pendingAmount?: number | null, availableAmount?: number | null, paymentGatewayType: Types.PaymentGatewayType, currency?: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } | null }> | null } };


export const GetCurrentAppFinancialDocument = gql`
    query GetCurrentAppFinancial {
  currentApp {
    id
    balances {
      currency {
        id
        symbol
        minorUnit
      }
      pendingAmount
      availableAmount
      paymentGatewayType
    }
  }
}
    `;

export function useGetCurrentAppFinancialQuery(options?: Omit<Urql.UseQueryArgs<GetCurrentAppFinancialQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCurrentAppFinancialQuery, GetCurrentAppFinancialQueryVariables>({ query: GetCurrentAppFinancialDocument, ...options });
};