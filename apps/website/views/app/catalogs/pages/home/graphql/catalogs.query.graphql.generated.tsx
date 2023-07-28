import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCatalogsPageCatalogsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCatalogsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCatalogsPageCatalogsQuery = { __typename?: 'Query', catalogs: { __typename?: 'Catalogs', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Catalog', id: string, title: string, subtitle?: string | null }> | null } };

export type AdminCatalogsPageCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null };

export const AdminCatalogsPageCatalogFragmentDoc = gql`
    fragment AdminCatalogsPageCatalog on Catalog {
  id
  title
  subtitle
}
    `;
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