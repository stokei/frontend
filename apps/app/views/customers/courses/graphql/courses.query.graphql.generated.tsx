import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCustomersCoursePageCourseQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCourseStudentsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetCustomersCoursePageCourseQuery = { __typename?: 'Query', courseStudents: { __typename?: 'CourseStudents', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'CourseStudent', id: string, course?: { __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null } | null }> | null } };

export type CustomersCoursePageCourseStudentFragment = { __typename?: 'CourseStudent', id: string, course?: { __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null } | null };

export type CustomersCoursePageCourseFragment = { __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null };

export const CustomersCoursePageCourseFragmentDoc = gql`
    fragment CustomersCoursePageCourse on Course {
  id
  name
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
export const CustomersCoursePageCourseStudentFragmentDoc = gql`
    fragment CustomersCoursePageCourseStudent on CourseStudent {
  id
  course {
    ...CustomersCoursePageCourse
  }
}
    ${CustomersCoursePageCourseFragmentDoc}`;
export const GetCustomersCoursePageCourseDocument = gql`
    query GetCustomersCoursePageCourse($where: WhereDataFindAllCourseStudentsInput, $page: PaginationInput) {
  courseStudents(where: $where, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...CustomersCoursePageCourseStudent
    }
  }
}
    ${CustomersCoursePageCourseStudentFragmentDoc}`;

export function useGetCustomersCoursePageCourseQuery(options?: Omit<Urql.UseQueryArgs<GetCustomersCoursePageCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCustomersCoursePageCourseQuery, GetCustomersCoursePageCourseQueryVariables>({ query: GetCustomersCoursePageCourseDocument, ...options });
};