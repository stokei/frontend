import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SortedItemComponentCatalogItemFragmentDoc } from '../../../../components/sorted-item-factory/graphql/sorted-item.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCatalogsPageCatalogsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCatalogsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCatalogsPageCatalogsQuery = { __typename?: 'Query', catalogs: { __typename?: 'Catalogs', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Catalog', id: string, title: string, subtitle?: string | null, items?: { __typename?: 'CatalogItems', items?: Array<{ __typename?: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } | null }> | null } };

export type AdminCatalogsPageCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null, items?: { __typename?: 'CatalogItems', items?: Array<{ __typename?: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } | null };

export const AdminCatalogsPageCatalogFragmentDoc = gql`
    fragment AdminCatalogsPageCatalog on Catalog {
  id
  title
  subtitle
  items(page: {limit: 5}) {
    items {
      ...SortedItemComponentCatalogItem
    }
  }
}
    ${SortedItemComponentCatalogItemFragmentDoc}`;
export const GetAdminCatalogsPageCatalogsDocument = gql`
    query GetAdminCatalogsPageCatalogs($where: WhereDataFindAllCatalogsInput, $orderBy: OrderByDataFindAllCatalogsInput, $page: PaginationInput) {
  catalogs(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AdminCatalogsPageCatalog
    }
  }
}
    ${AdminCatalogsPageCatalogFragmentDoc}`;

export function useGetAdminCatalogsPageCatalogsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminCatalogsPageCatalogsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCatalogsPageCatalogsQuery, GetAdminCatalogsPageCatalogsQueryVariables>({ query: GetAdminCatalogsPageCatalogsDocument, ...options });
};