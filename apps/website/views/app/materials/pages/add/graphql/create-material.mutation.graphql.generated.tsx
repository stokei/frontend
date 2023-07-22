import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMaterialFragmentDoc } from '../../home/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateMaterialMutationVariables = Types.Exact<{
  input: Types.CreateMaterialInput;
}>;


export type CreateMaterialMutation = { __typename?: 'Mutation', createMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const CreateMaterialDocument = gql`
    mutation CreateMaterial($input: CreateMaterialInput!) {
  createMaterial(input: $input) {
    ...AppMaterial
  }
}
    ${AppMaterialFragmentDoc}`;

export function useCreateMaterialMutation() {
  return Urql.useMutation<CreateMaterialMutation, CreateMaterialMutationVariables>(CreateMaterialDocument);
};