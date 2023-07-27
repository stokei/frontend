import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppBillingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAppBillingQuery = { __typename?: 'Query', billing: { __typename?: 'Billing', total?: number | null, currency?: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } | null, items?: Array<{ __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', nickname?: string | null, currency: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } } | null }> | null } };

export type AppBillingFragment = { __typename?: 'Billing', total?: number | null, currency?: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } | null, items?: Array<{ __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', nickname?: string | null, currency: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } } | null }> | null };

export type AppBillingItemFragment = { __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', nickname?: string | null, currency: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } } | null };

export const AppBillingItemFragmentDoc = gql`
    fragment AppBillingItem on BillingItem {
  unitAmount
  quantity
  total
  price {
    nickname
    currency {
      id
      minorUnit
      symbol
    }
  }
}
    `;
export const AppBillingFragmentDoc = gql`
    fragment AppBilling on Billing {
  total
  currency {
    id
    minorUnit
    symbol
  }
  items {
    ...AppBillingItem
  }
}
    ${AppBillingItemFragmentDoc}`;
export const GetAppBillingDocument = gql`
    query GetAppBilling {
  billing {
    ...AppBilling
  }
}
    ${AppBillingFragmentDoc}`;

export function useGetAppBillingQuery(options?: Omit<Urql.UseQueryArgs<GetAppBillingQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppBillingQuery, GetAppBillingQueryVariables>({ query: GetAppBillingDocument, ...options });
};