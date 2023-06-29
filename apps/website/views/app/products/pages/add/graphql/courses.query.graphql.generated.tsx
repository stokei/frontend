import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAddProductCoursesSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCoursesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAddProductCoursesSelectQuery = { __typename?: 'Query', courses: { __typename?: 'Courses', totalCount: number, items?: Array<{ __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type AddProductCourseSelectFragment = { __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AddProductCourseSelectFragmentDoc = gql`
    fragment AddProductCourseSelect on Course {
  id
  name
  avatar {
    file {
      url
    }
  }
}
    `;
export const GetAddProductCoursesSelectDocument = gql`
    query GetAddProductCoursesSelect($where: WhereDataFindAllCoursesInput, $page: PaginationInput) {
  courses(where: $where, page: $page) {
    totalCount
    items {
      ...AddProductCourseSelect
    }
  }
}
    ${AddProductCourseSelectFragmentDoc}`;

export function useGetAddProductCoursesSelectQuery(options?: Omit<Urql.UseQueryArgs<GetAddProductCoursesSelectQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAddProductCoursesSelectQuery, GetAddProductCoursesSelectQueryVariables>({ query: GetAddProductCoursesSelectDocument, ...options });
};