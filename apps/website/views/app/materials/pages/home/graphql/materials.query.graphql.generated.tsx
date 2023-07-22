import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppMaterialsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllMaterialsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllMaterialsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppMaterialsQuery = { __typename?: 'Query', materials: { __typename?: 'Materials', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type AppMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppMaterialFragmentDoc = gql`
    fragment AppMaterial on Material {
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
export const GetAppMaterialsDocument = gql`
    query GetAppMaterials($where: WhereDataFindAllMaterialsInput, $orderBy: OrderByDataFindAllMaterialsInput, $page: PaginationInput) {
  materials(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppMaterial
    }
  }
}
    ${AppMaterialFragmentDoc}`;

export function useGetAppMaterialsQuery(options?: Omit<Urql.UseQueryArgs<GetAppMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppMaterialsQuery, GetAppMaterialsQueryVariables>({ query: GetAppMaterialsDocument, ...options });
};