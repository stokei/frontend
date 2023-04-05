import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageCourseInstructorsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCourseInstructorsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCoursePageCourseInstructorsQuery = { __typename?: 'Query', courseInstructors: { __typename?: 'CourseInstructors', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'CourseInstructor', instructor: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } };

export type AdminCoursePageCourseInstructorFragment = { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminCoursePageCourseInstructorFragmentDoc = gql`
    fragment AdminCoursePageCourseInstructor on Account {
  id
  fullname
  email
  avatar {
    file {
      url
    }
  }
}
    `;
export const GetAdminCoursePageCourseInstructorsDocument = gql`
    query GetAdminCoursePageCourseInstructors($where: WhereDataFindAllCourseInstructorsInput, $page: PaginationInput) {
  courseInstructors(where: $where, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      instructor {
        ...AdminCoursePageCourseInstructor
      }
    }
  }
}
    ${AdminCoursePageCourseInstructorFragmentDoc}`;

export function useGetAdminCoursePageCourseInstructorsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminCoursePageCourseInstructorsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageCourseInstructorsQuery, GetAdminCoursePageCourseInstructorsQueryVariables>({ query: GetAdminCoursePageCourseInstructorsDocument, ...options });
};