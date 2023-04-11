import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageModulesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllModulesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllModulesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCoursePageModulesQuery = { __typename?: 'Query', modules: { __typename?: 'Modules', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null }> | null } };

export type AdminCoursePageModuleFragment = { __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null };

export type AdminCoursePageModuleVideoFragment = { __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null };

export const AdminCoursePageModuleVideoFragmentDoc = gql`
    fragment AdminCoursePageModuleVideo on Video {
  id
  name
  private
  active
  authors {
    totalCount
    items {
      author {
        id
        fullname
        avatar {
          file {
            url
          }
        }
      }
    }
  }
  poster {
    id
    file {
      url
    }
  }
  file {
    url
    duration
  }
}
    `;
export const AdminCoursePageModuleFragmentDoc = gql`
    fragment AdminCoursePageModule on Module {
  id
  name
  parent
  videos {
    totalCount
    items {
      ...AdminCoursePageModuleVideo
    }
  }
}
    ${AdminCoursePageModuleVideoFragmentDoc}`;
export const GetAdminCoursePageModulesDocument = gql`
    query GetAdminCoursePageModules($where: WhereDataFindAllModulesInput, $orderBy: OrderByDataFindAllModulesInput, $page: PaginationInput) {
  modules(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AdminCoursePageModule
    }
  }
}
    ${AdminCoursePageModuleFragmentDoc}`;

export function useGetAdminCoursePageModulesQuery(options?: Omit<Urql.UseQueryArgs<GetAdminCoursePageModulesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageModulesQuery, GetAdminCoursePageModulesQueryVariables>({ query: GetAdminCoursePageModulesDocument, ...options });
};