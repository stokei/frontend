import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageModuleEditVideoQueryVariables = Types.Exact<{
  moduleId: Types.Scalars['String'];
}>;


export type GetAdminCoursePageModuleEditVideoQuery = { __typename?: 'Query', module: { __typename?: 'Module', id: string, name: string, parent: string } };

export type AdminCoursePageModuleEditVideoFragment = { __typename?: 'Module', id: string, name: string, parent: string };

export const AdminCoursePageModuleEditVideoFragmentDoc = gql`
    fragment AdminCoursePageModuleEditVideo on Module {
  id
  name
  parent
}
    `;
export const GetAdminCoursePageModuleEditVideoDocument = gql`
    query GetAdminCoursePageModuleEditVideo($moduleId: String!) {
  module(id: $moduleId) {
    ...AdminCoursePageModuleEditVideo
  }
}
    ${AdminCoursePageModuleEditVideoFragmentDoc}`;

export function useGetAdminCoursePageModuleEditVideoQuery(options: Omit<Urql.UseQueryArgs<GetAdminCoursePageModuleEditVideoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageModuleEditVideoQuery, GetAdminCoursePageModuleEditVideoQueryVariables>({ query: GetAdminCoursePageModuleEditVideoDocument, ...options });
};