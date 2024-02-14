import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSitePagesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPagesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllPagesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetSitePagesQuery = { __typename?: 'Query', pages: { __typename?: 'Pages', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Page', id: string, title: string, slug: string }> | null } };

export type SitePagesPageFragment = { __typename?: 'Page', id: string, title: string, slug: string };

export const SitePagesPageFragmentDoc = gql`
    fragment SitePagesPage on Page {
  id
  title
  slug
}
    `;
export const GetSitePagesDocument = gql`
    query GetSitePages($where: WhereDataFindAllPagesInput, $orderBy: OrderByDataFindAllPagesInput, $page: PaginationInput) {
  pages(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...SitePagesPage
    }
  }
}
    ${SitePagesPageFragmentDoc}`;

export function useGetSitePagesQuery(options?: Omit<Urql.UseQueryArgs<GetSitePagesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSitePagesQuery, GetSitePagesQueryVariables>({ query: GetSitePagesDocument, ...options });
};