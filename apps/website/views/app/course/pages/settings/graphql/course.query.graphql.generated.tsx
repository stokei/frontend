import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminSettingsCoursePageCourseQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
}>;


export type GetAdminSettingsCoursePageCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export type AdminSettingsCoursePageCourseFragment = { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminSettingsCoursePageCourseFragmentDoc = gql`
    fragment AdminSettingsCoursePageCourse on Course {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
}
    `;
export const GetAdminSettingsCoursePageCourseDocument = gql`
    query GetAdminSettingsCoursePageCourse($courseId: String!) {
  course(id: $courseId) {
    ...AdminSettingsCoursePageCourse
  }
}
    ${AdminSettingsCoursePageCourseFragmentDoc}`;

export function useGetAdminSettingsCoursePageCourseQuery(options: Omit<Urql.UseQueryArgs<GetAdminSettingsCoursePageCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminSettingsCoursePageCourseQuery, GetAdminSettingsCoursePageCourseQueryVariables>({ query: GetAdminSettingsCoursePageCourseDocument, ...options });
};