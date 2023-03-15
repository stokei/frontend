import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SortedItemComponentFragmentDoc } from '../../../components/sorted-item-factory/sorted-item.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SortedItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllSortedItemsInput;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type SortedItemsQuery = { __typename?: 'Query', sortedItems: { __typename?: 'SortedItems', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SortedItem', id: string, parent?: string | null, index?: number | null, item?: { __typename: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null } | { __typename: 'CatalogItem' } | { __typename: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } };


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