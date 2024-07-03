import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPluginsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPluginsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllPluginsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetPluginsQuery = { __typename?: 'Query', plugins: { __typename?: 'Plugins', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Plugin', id: string, type: Types.PluginType }> | null } };

export type GetPluginsPluginFragment = { __typename?: 'Plugin', id: string, type: Types.PluginType };

export const GetPluginsPluginFragmentDoc = gql`
    fragment GetPluginsPlugin on Plugin {
  id
  type
}
    `;
export const GetPluginsDocument = gql`
    query GetPlugins($where: WhereDataFindAllPluginsInput, $orderBy: OrderByDataFindAllPluginsInput, $page: PaginationInput) {
  plugins(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...GetPluginsPlugin
    }
  }
}
    ${GetPluginsPluginFragmentDoc}`;

export function useGetPluginsQuery(options?: Omit<Urql.UseQueryArgs<GetPluginsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPluginsQuery, GetPluginsQueryVariables>({ query: GetPluginsDocument, ...options });
};