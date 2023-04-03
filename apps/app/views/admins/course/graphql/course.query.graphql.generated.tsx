import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageCourseQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
}>;


export type GetAdminCoursePageCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null } };

export type AdminCoursePageCourseFragment = { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null };

export const AdminCoursePageCourseFragmentDoc = gql`
    fragment AdminCoursePageCourse on Course {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  instructors {
    totalCount
    items {
      id
      instructor {
        id
        firstname
        fullname
        avatar {
          file {
            url
          }
        }
      }
    }
  }
}
    `;
export const GetAdminCoursePageCourseDocument = gql`
    query GetAdminCoursePageCourse($courseId: String!) {
  course(id: $courseId) {
    ...AdminCoursePageCourse
  }
}
    ${AdminCoursePageCourseFragmentDoc}`;

export function useGetAdminCoursePageCourseQuery(options: Omit<Urql.UseQueryArgs<GetAdminCoursePageCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageCourseQuery, GetAdminCoursePageCourseQueryVariables>({ query: GetAdminCoursePageCourseDocument, ...options });
};