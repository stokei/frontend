import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { GeneralProductFragmentDoc } from '../../../../../../services/graphql/types/product.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCatalogPageCatalogItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllCatalogItemsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCatalogPageCatalogItemsQuery = { __typename?: 'Query', catalogItems: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, parent?: string | null, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, combo?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null, externalReference?: { __typename: 'App' } | { __typename: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', type: Types.PlanType } | { __typename: 'Product' } | null } }> | null } };

export type AdminCatalogPageCatalogItemFragment = { __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, parent?: string | null, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, combo?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null, externalReference?: { __typename: 'App' } | { __typename: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', type: Types.PlanType } | { __typename: 'Product' } | null } };

export const AdminCatalogPageCatalogItemFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItem on CatalogItem {
  id
  catalog
  product {
    ...GeneralProduct
  }
}
    ${GeneralProductFragmentDoc}`;
export const GetAdminCatalogPageCatalogItemsDocument = gql`
    query GetAdminCatalogPageCatalogItems($where: WhereDataFindAllCatalogItemsInput!, $orderBy: OrderByDataFindAllCatalogItemsInput, $page: PaginationInput) {
  catalogItems(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    items {
      ...AdminCatalogPageCatalogItem
    }
  }
}
    ${AdminCatalogPageCatalogItemFragmentDoc}`;

export function useGetAdminCatalogPageCatalogItemsQuery(options: Omit<Urql.UseQueryArgs<GetAdminCatalogPageCatalogItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCatalogPageCatalogItemsQuery, GetAdminCatalogPageCatalogItemsQueryVariables>({ query: GetAdminCatalogPageCatalogItemsDocument, ...options });
};