import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CheckoutProductFragmentDoc } from '../../../graphql/product.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutProductsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllProductsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllProductsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetCheckoutProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, externalReference?: { __typename: 'App' } | { __typename: 'Course', courseId: string, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product' } | null }> | null } };


export const GetCheckoutProductsDocument = gql`
    query GetCheckoutProducts($where: WhereDataFindAllProductsInput, $orderBy: OrderByDataFindAllProductsInput, $page: PaginationInput) {
  products(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...CheckoutProduct
    }
  }
}
    ${CheckoutProductFragmentDoc}`;

export function useGetCheckoutProductsQuery(options?: Omit<Urql.UseQueryArgs<GetCheckoutProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutProductsQuery, GetCheckoutProductsQueryVariables>({ query: GetCheckoutProductsDocument, ...options });
};