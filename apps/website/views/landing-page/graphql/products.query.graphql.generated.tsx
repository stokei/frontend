import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetLandingPageProductsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllProductsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllProductsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetLandingPageProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course' } | { __typename: 'Material' } | { __typename: 'Plan', id: string, name: string, icon?: string | null } | null }> | null } };

export type LandingPageProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course' } | { __typename: 'Material' } | { __typename: 'Plan', id: string, name: string, icon?: string | null } | null };

export type LandingPageProductPlanFragment = { __typename?: 'Plan', id: string, name: string, icon?: string | null };

export type LandingPageProductFeatureFragment = { __typename?: 'Feature', id: string, name: string, description?: string | null };

export const LandingPageProductFeatureFragmentDoc = gql`
    fragment LandingPageProductFeature on Feature {
  id
  name
  description
}
    `;
export const LandingPageProductPlanFragmentDoc = gql`
    fragment LandingPageProductPlan on Plan {
  id
  name
  icon
}
    `;
export const LandingPageProductFragmentDoc = gql`
    fragment LandingPageProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  defaultPrice {
    ...PriceComponent
  }
  features {
    items {
      ...LandingPageProductFeature
    }
  }
  parent {
    __typename
    ...LandingPageProductPlan
  }
}
    ${PriceComponentFragmentDoc}
${LandingPageProductFeatureFragmentDoc}
${LandingPageProductPlanFragmentDoc}`;
export const GetLandingPageProductsDocument = gql`
    query GetLandingPageProducts($where: WhereDataFindAllProductsInput, $orderBy: OrderByDataFindAllProductsInput, $page: PaginationInput) {
  products(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...LandingPageProduct
    }
  }
}
    ${LandingPageProductFragmentDoc}`;

export function useGetLandingPageProductsQuery(options?: Omit<Urql.UseQueryArgs<GetLandingPageProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetLandingPageProductsQuery, GetLandingPageProductsQueryVariables>({ query: GetLandingPageProductsDocument, ...options });
};