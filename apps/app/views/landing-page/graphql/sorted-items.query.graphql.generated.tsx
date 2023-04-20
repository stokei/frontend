import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SortedItemComponentFragmentDoc } from '../../../components/sorted-item-factory/sorted-item.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SortedItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllSortedItemsInput;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type SortedItemsQuery = { __typename?: 'Query', sortedItems: { __typename?: 'SortedItems', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SortedItem', id: string, parent?: string | null, index?: number | null, item?: { __typename: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null } | { __typename: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } } | { __typename: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } };


export const SortedItemsDocument = gql`
    query SortedItems($where: WhereDataFindAllSortedItemsInput!, $page: PaginationInput) {
  sortedItems(where: $where, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...SortedItemComponent
    }
  }
}
    ${SortedItemComponentFragmentDoc}`;

export function useSortedItemsQuery(options: Omit<Urql.UseQueryArgs<SortedItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<SortedItemsQuery, SortedItemsQueryVariables>({ query: SortedItemsDocument, ...options });
};