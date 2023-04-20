import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductPagePricesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPricesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllPricesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetProductPagePricesQuery = { __typename?: 'Query', prices: { __typename?: 'Prices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Price', id: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } };


export const GetProductPagePricesDocument = gql`
    query GetProductPagePrices($where: WhereDataFindAllPricesInput, $orderBy: OrderByDataFindAllPricesInput, $page: PaginationInput) {
  prices(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    totalCount
    items {
      ...PriceComponent
    }
  }
}
    ${PriceComponentFragmentDoc}`;

export function useGetProductPagePricesQuery(options?: Omit<Urql.UseQueryArgs<GetProductPagePricesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductPagePricesQuery, GetProductPagePricesQueryVariables>({ query: GetProductPagePricesDocument, ...options });
};