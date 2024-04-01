import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetVersionsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllVersionsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllVersionsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetVersionsQuery = { __typename?: 'Query', versions: { __typename?: 'Versions', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Version', id: string, name: string }> | null } };

export type PageVersionFragment = { __typename?: 'Version', id: string, name: string };

export const PageVersionFragmentDoc = gql`
    fragment PageVersion on Version {
  id
  name
}
    `;
export const GetVersionsDocument = gql`
    query GetVersions($where: WhereDataFindAllVersionsInput, $orderBy: OrderByDataFindAllVersionsInput, $page: PaginationInput) {
  versions(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...PageVersion
    }
  }
}
    ${PageVersionFragmentDoc}`;

export function useGetVersionsQuery(options?: Omit<Urql.UseQueryArgs<GetVersionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetVersionsQuery, GetVersionsQueryVariables>({ query: GetVersionsDocument, ...options });
};