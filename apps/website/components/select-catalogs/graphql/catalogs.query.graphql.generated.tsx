import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppCatalogsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCatalogsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppCatalogsQuery = { __typename?: 'Query', catalogs: { __typename?: 'Catalogs', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Catalog', id: string, title: string, subtitle?: string | null }> | null } };

export type AppCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null };

export const AppCatalogFragmentDoc = gql`
    fragment AppCatalog on Catalog {
  id
  title
  subtitle
}
    `;
export const GetAppCatalogsDocument = gql`
    query GetAppCatalogs($where: WhereDataFindAllCatalogsInput, $orderBy: OrderByDataFindAllCatalogsInput, $page: PaginationInput) {
  catalogs(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppCatalog
    }
  }
}
    ${AppCatalogFragmentDoc}`;

export function useGetAppCatalogsQuery(options?: Omit<Urql.UseQueryArgs<GetAppCatalogsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppCatalogsQuery, GetAppCatalogsQueryVariables>({ query: GetAppCatalogsDocument, ...options });
};