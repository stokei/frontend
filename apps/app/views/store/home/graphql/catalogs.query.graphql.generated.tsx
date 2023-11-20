import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetStoreCatalogsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCatalogsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetStoreCatalogsQuery = { __typename?: 'Query', catalogs: { __typename?: 'Catalogs', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Catalog', id: string, title: string, subtitle?: string | null }> | null } };

export type StoreCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null };

export const StoreCatalogFragmentDoc = gql`
    fragment StoreCatalog on Catalog {
  id
  title
  subtitle
}
    `;
export const GetStoreCatalogsDocument = gql`
    query GetStoreCatalogs($where: WhereDataFindAllCatalogsInput, $orderBy: OrderByDataFindAllCatalogsInput, $page: PaginationInput) {
  catalogs(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...StoreCatalog
    }
  }
}
    ${StoreCatalogFragmentDoc}`;

export function useGetStoreCatalogsQuery(options?: Omit<Urql.UseQueryArgs<GetStoreCatalogsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetStoreCatalogsQuery, GetStoreCatalogsQueryVariables>({ query: GetStoreCatalogsDocument, ...options });
};