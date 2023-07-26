import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCustomersCoursePageMaterialQueryVariables = Types.Exact<{
  materialId: Types.Scalars['String'];
}>;


export type GetCustomersCoursePageMaterialQuery = { __typename?: 'Query', material: { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export type CustomersCoursePageMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const CustomersCoursePageMaterialFragmentDoc = gql`
    fragment CustomersCoursePageMaterial on Material {
  id
  name
  description
  file {
    id
    url
  }
  avatar {
    file {
      url
    }
  }
}
    `;
export const GetCustomersCoursePageMaterialDocument = gql`
    query GetCustomersCoursePageMaterial($materialId: String!) {
  material(id: $materialId) {
    ...CustomersCoursePageMaterial
  }
}
    ${CustomersCoursePageMaterialFragmentDoc}`;

export function useGetCustomersCoursePageMaterialQuery(options: Omit<Urql.UseQueryArgs<GetCustomersCoursePageMaterialQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCustomersCoursePageMaterialQuery, GetCustomersCoursePageMaterialQueryVariables>({ query: GetCustomersCoursePageMaterialDocument, ...options });
};