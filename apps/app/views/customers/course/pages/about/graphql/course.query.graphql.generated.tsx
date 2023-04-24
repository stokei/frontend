import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCustomerCoursePageCourseQueryVariables = Types.Exact<{
  courseId: Types.Scalars['String'];
}>;


export type GetCustomerCoursePageCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null } };

export type CustomerCoursePageCourseFragment = { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null };

export const CustomerCoursePageCourseFragmentDoc = gql`
    fragment CustomerCoursePageCourse on Course {
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
        email
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
export const GetCustomerCoursePageCourseDocument = gql`
    query GetCustomerCoursePageCourse($courseId: String!) {
  course(id: $courseId) {
    ...CustomerCoursePageCourse
  }
}
    ${CustomerCoursePageCourseFragmentDoc}`;

export function useGetCustomerCoursePageCourseQuery(options: Omit<Urql.UseQueryArgs<GetCustomerCoursePageCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCustomerCoursePageCourseQuery, GetCustomerCoursePageCourseQueryVariables>({ query: GetCustomerCoursePageCourseDocument, ...options });
};