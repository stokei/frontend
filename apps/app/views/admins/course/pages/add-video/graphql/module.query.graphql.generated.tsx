import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageModuleVideoFragmentDoc } from '../../modules/graphql/modules.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageModuleQueryVariables = Types.Exact<{
  moduleId: Types.Scalars['String'];
}>;


export type GetAdminCoursePageModuleQuery = { __typename?: 'Query', module: { __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null } };

export type AdminCoursePageModuleFragment = { __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null };

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
export const GetAdminCoursePageModuleDocument = gql`
    query GetAdminCoursePageModule($moduleId: String!) {
  module(id: $moduleId) {
    ...AdminCoursePageModule
  }
}
    ${AdminCoursePageModuleFragmentDoc}`;

export function useGetAdminCoursePageModuleQuery(options: Omit<Urql.UseQueryArgs<GetAdminCoursePageModuleQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageModuleQuery, GetAdminCoursePageModuleQueryVariables>({ query: GetAdminCoursePageModuleDocument, ...options });
};