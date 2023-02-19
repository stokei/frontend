import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminsCourseFragmentDoc } from './course.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCoursesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCoursesInput>;
}>;


export type GetCoursesQuery = { __typename?: 'Query', courses: { __typename?: 'Courses', items?: Array<{ __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null }> | null } };


export const GetCoursesDocument = gql`
    query GetCourses($where: WhereDataFindAllCoursesInput) {
  courses(where: $where) {
    items {
      ...AdminsCourse
    }
  }
}
    ${AdminsCourseFragmentDoc}`;

export function useGetCoursesQuery(options?: Omit<Urql.UseQueryArgs<GetCoursesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCoursesQuery, GetCoursesQueryVariables>({ query: GetCoursesDocument, ...options });
};