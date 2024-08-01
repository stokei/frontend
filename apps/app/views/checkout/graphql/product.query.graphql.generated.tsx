import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { GeneralProductFragmentDoc } from '../../../services/graphql/types/product.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutProductQueryVariables = Types.Exact<{
  product: Types.Scalars['String'];
}>;


export type GetCheckoutProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, parent?: string | null, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, combo?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null, externalReference?: { __typename: 'App' } | { __typename: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', type: Types.PlanType } | { __typename: 'Product' } | null } };


export const GetCheckoutProductDocument = gql`
    query GetCheckoutProduct($product: String!) {
  product(id: $product) {
    ...GeneralProduct
  }
}
    ${GeneralProductFragmentDoc}`;

export function useGetCheckoutProductQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutProductQuery, GetCheckoutProductQueryVariables>({ query: GetCheckoutProductDocument, ...options });
};