import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCourseMaterialsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllMaterialsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllMaterialsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetCourseMaterialsQuery = { __typename?: 'Query', materials: { __typename?: 'Materials', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type CourseMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const CourseMaterialFragmentDoc = gql`
    fragment CourseMaterial on Material {
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
export const GetCourseMaterialsDocument = gql`
    query GetCourseMaterials($where: WhereDataFindAllMaterialsInput, $orderBy: OrderByDataFindAllMaterialsInput, $page: PaginationInput) {
  materials(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...CourseMaterial
    }
  }
}
    ${CourseMaterialFragmentDoc}`;

export function useGetCourseMaterialsQuery(options?: Omit<Urql.UseQueryArgs<GetCourseMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCourseMaterialsQuery, GetCourseMaterialsQueryVariables>({ query: GetCourseMaterialsDocument, ...options });
};