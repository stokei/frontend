import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetStoreCatalogItemsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCatalogItemsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetStoreCatalogItemsQuery = { __typename?: 'Query', catalogItems: { __typename?: 'CatalogItems', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'CatalogItem', product: { __typename?: 'Product', id: string } }> | null } };


export const GetStoreCatalogItemsDocument = gql`
    query GetStoreCatalogItems($where: WhereDataFindAllCatalogItemsInput, $orderBy: OrderByDataFindAllCatalogItemsInput, $page: PaginationInput) {
  catalogItems(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      product {
        id
      }
    }
  }
}
    `;

export function useGetStoreCatalogItemsQuery(options?: Omit<Urql.UseQueryArgs<GetStoreCatalogItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStoreCatalogItemsQuery, GetStoreCatalogItemsQueryVariables>({ query: GetStoreCatalogItemsDocument, ...options });
};