import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageCourseStudentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCourseStudentsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCoursePageCourseStudentsQuery = { __typename?: 'Query', courseStudents: { __typename?: 'CourseStudents', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'CourseStudent', student: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } };

export type AdminCoursePageCourseStudentFragment = { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminCoursePageCourseStudentFragmentDoc = gql`
    fragment AdminCoursePageCourseStudent on Account {
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
export const GetAdminCoursePageCourseStudentsDocument = gql`
    query GetAdminCoursePageCourseStudents($where: WhereDataFindAllCourseStudentsInput, $page: PaginationInput) {
  courseStudents(where: $where, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      student {
        ...AdminCoursePageCourseStudent
      }
    }
  }
}
    ${AdminCoursePageCourseStudentFragmentDoc}`;

export function useGetAdminCoursePageCourseStudentsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminCoursePageCourseStudentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageCourseStudentsQuery, GetAdminCoursePageCourseStudentsQueryVariables>({ query: GetAdminCoursePageCourseStudentsDocument, ...options });
};