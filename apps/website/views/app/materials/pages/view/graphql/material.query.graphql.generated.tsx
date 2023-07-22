import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMaterialFragmentDoc } from '../../home/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppMaterialQueryVariables = Types.Exact<{
  material: Types.Scalars['String'];
}>;


export type GetAppMaterialQuery = { __typename?: 'Query', material: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const GetAppMaterialDocument = gql`
    query GetAppMaterial($material: String!) {
  material(id: $material) {
    ...AppMaterial
  }
}
    ${AppMaterialFragmentDoc}`;

export function useGetAppMaterialQuery(options: Omit<Urql.UseQueryArgs<GetAppMaterialQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppMaterialQuery, GetAppMaterialQueryVariables>({ query: GetAppMaterialDocument, ...options });
};