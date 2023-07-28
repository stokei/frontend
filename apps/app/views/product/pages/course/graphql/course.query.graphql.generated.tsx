import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductPageCourseQueryVariables = Types.Exact<{
  course: Types.Scalars['String'];
}>;


export type GetProductPageCourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', id: string, description?: string | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null } };

export type ProductPageCourseInstructorFragment = { __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export const ProductPageCourseInstructorFragmentDoc = gql`
    fragment ProductPageCourseInstructor on CourseInstructor {
  id
  instructor {
    id
    fullname
    avatar {
      file {
        url
      }
    }
  }
}
    `;
export const GetProductPageCourseDocument = gql`
    query GetProductPageCourse($course: String!) {
  course(id: $course) {
    id
    description
    instructors {
      totalCount
      items {
        ...ProductPageCourseInstructor
      }
    }
  }
}
    ${ProductPageCourseInstructorFragmentDoc}`;

export function useGetProductPageCourseQuery(options: Omit<Urql.UseQueryArgs<GetProductPageCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductPageCourseQuery, GetProductPageCourseQueryVariables>({ query: GetProductPageCourseDocument, ...options });
};