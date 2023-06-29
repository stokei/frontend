import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminAppPageAppsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAppsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllAppsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminAppPageAppsQuery = { __typename?: 'Query', apps: { __typename?: 'Apps', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'App', id: string, name: string, status: Types.AppStatus, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type AdminAppPageAppFragment = { __typename?: 'App', id: string, name: string, status: Types.AppStatus, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminAppPageAppFragmentDoc = gql`
    fragment AdminAppPageApp on App {
  id
  name
  status
  logo {
    file {
      url
    }
  }
}
    `;
export const GetAdminAppPageAppsDocument = gql`
    query GetAdminAppPageApps($where: WhereDataFindAllAppsInput, $orderBy: OrderByDataFindAllAppsInput, $page: PaginationInput) {
  apps(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AdminAppPageApp
    }
  }
}
    ${AdminAppPageAppFragmentDoc}`;

export function useGetAdminAppPageAppsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminAppPageAppsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminAppPageAppsQuery, GetAdminAppPageAppsQueryVariables>({ query: GetAdminAppPageAppsDocument, ...options });
};