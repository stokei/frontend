import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMaterialFragmentDoc } from '../../home/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveMaterialMutationVariables = Types.Exact<{
  input: Types.RemoveMaterialInput;
}>;


export type RemoveMaterialMutation = { __typename?: 'Mutation', removeMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null, filename: string, extension?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const RemoveMaterialDocument = gql`
    mutation RemoveMaterial($input: RemoveMaterialInput!) {
  removeMaterial(input: $input) {
    ...AppMaterial
  }
}
    ${AppMaterialFragmentDoc}`;

export function useRemoveMaterialMutation() {
  return Urql.useMutation<RemoveMaterialMutation, RemoveMaterialMutationVariables>(RemoveMaterialDocument);
};