import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CustomersCoursePageVideoFragmentDoc } from './video.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCustomersCoursePageVideoModulesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllModulesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllModulesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetCustomersCoursePageVideoModulesQuery = { __typename?: 'Query', modules: { __typename?: 'Modules', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null }> | null } };

export type CustomersCoursePageVideoModuleFragment = { __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null };

export const CustomersCoursePageVideoModuleFragmentDoc = gql`
    fragment CustomersCoursePageVideoModule on Module {
  id
  name
  parent
  videos {
    totalCount
    items {
      ...CustomersCoursePageVideo
    }
  }
}
    ${CustomersCoursePageVideoFragmentDoc}`;
export const GetCustomersCoursePageVideoModulesDocument = gql`
    query GetCustomersCoursePageVideoModules($where: WhereDataFindAllModulesInput, $orderBy: OrderByDataFindAllModulesInput, $page: PaginationInput) {
  modules(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...CustomersCoursePageVideoModule
    }
  }
}
    ${CustomersCoursePageVideoModuleFragmentDoc}`;

export function useGetCustomersCoursePageVideoModulesQuery(options?: Omit<Urql.UseQueryArgs<GetCustomersCoursePageVideoModulesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCustomersCoursePageVideoModulesQuery, GetCustomersCoursePageVideoModulesQueryVariables>({ query: GetCustomersCoursePageVideoModulesDocument, ...options });
};