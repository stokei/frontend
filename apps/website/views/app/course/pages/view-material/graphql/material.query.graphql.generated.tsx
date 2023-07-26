import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CourseMaterialFragmentDoc } from '../../materials/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCourseMaterialQueryVariables = Types.Exact<{
  material: Types.Scalars['String'];
}>;


export type GetCourseMaterialQuery = { __typename?: 'Query', material: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const GetCourseMaterialDocument = gql`
    query GetCourseMaterial($material: String!) {
  material(id: $material) {
    ...CourseMaterial
  }
}
    ${CourseMaterialFragmentDoc}`;

export function useGetCourseMaterialQuery(options: Omit<Urql.UseQueryArgs<GetCourseMaterialQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCourseMaterialQuery, GetCourseMaterialQueryVariables>({ query: GetCourseMaterialDocument, ...options });
};