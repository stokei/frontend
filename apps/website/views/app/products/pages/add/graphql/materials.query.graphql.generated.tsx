import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAddProductMaterialsSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllMaterialsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAddProductMaterialsSelectQuery = { __typename?: 'Query', materials: { __typename?: 'Materials', totalCount: number, items?: Array<{ __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type AddProductMaterialSelectFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AddProductMaterialSelectFragmentDoc = gql`
    fragment AddProductMaterialSelect on Material {
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
export const GetAddProductMaterialsSelectDocument = gql`
    query GetAddProductMaterialsSelect($where: WhereDataFindAllMaterialsInput, $page: PaginationInput) {
  materials(where: $where, page: $page) {
    totalCount
    items {
      ...AddProductMaterialSelect
    }
  }
}
    ${AddProductMaterialSelectFragmentDoc}`;

export function useGetAddProductMaterialsSelectQuery(options?: Omit<Urql.UseQueryArgs<GetAddProductMaterialsSelectQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAddProductMaterialsSelectQuery, GetAddProductMaterialsSelectQueryVariables>({ query: GetAddProductMaterialsSelectDocument, ...options });
};