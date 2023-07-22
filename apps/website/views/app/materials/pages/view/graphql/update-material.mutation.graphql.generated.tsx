import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMaterialFragmentDoc } from '../../home/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateMaterialMutationVariables = Types.Exact<{
  input: Types.UpdateMaterialInput;
}>;


export type UpdateMaterialMutation = { __typename?: 'Mutation', updateMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const UpdateMaterialDocument = gql`
    mutation UpdateMaterial($input: UpdateMaterialInput!) {
  updateMaterial(input: $input) {
    ...AppMaterial
  }
}
    ${AppMaterialFragmentDoc}`;

export function useUpdateMaterialMutation() {
  return Urql.useMutation<UpdateMaterialMutation, UpdateMaterialMutationVariables>(UpdateMaterialDocument);
};