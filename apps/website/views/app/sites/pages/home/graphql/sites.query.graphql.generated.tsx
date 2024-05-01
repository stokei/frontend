import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSitesHomePageSitesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllSitesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllSitesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetSitesHomePageSitesQuery = { __typename?: 'Query', sites: { __typename?: 'Sites', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Site', id: string, name: string, slug: string, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type SitesHomePageSiteFragment = { __typename?: 'Site', id: string, name: string, slug: string, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SitesHomePageSiteFragmentDoc = gql`
    fragment SitesHomePageSite on Site {
  id
  name
  slug
  logo {
    file {
      url
    }
  }
}
    `;
export const GetSitesHomePageSitesDocument = gql`
    query GetSitesHomePageSites($where: WhereDataFindAllSitesInput, $orderBy: OrderByDataFindAllSitesInput, $page: PaginationInput) {
  sites(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...SitesHomePageSite
    }
  }
}
    ${SitesHomePageSiteFragmentDoc}`;

export function useGetSitesHomePageSitesQuery(options?: Omit<Urql.UseQueryArgs<GetSitesHomePageSitesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSitesHomePageSitesQuery, GetSitesHomePageSitesQueryVariables>({ query: GetSitesHomePageSitesDocument, ...options });
};