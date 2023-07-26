import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CourseMaterialFragmentDoc } from '../../materials/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateCourseMaterialMutationVariables = Types.Exact<{
  input: Types.UpdateMaterialInput;
}>;


export type UpdateCourseMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const UpdateCourseMaterialDocument = gql`
    mutation UpdateCourseMaterial($input: UpdateMaterialInput!) {
  updateMaterial(input: $input) {
    ...CourseMaterial
  }
}
    ${CourseMaterialFragmentDoc}`;

export function useUpdateCourseMaterialMutation() {
  return Urql.useMutation<UpdateCourseMaterialMutation, UpdateCourseMaterialMutationVariables>(UpdateCourseMaterialDocument);
};