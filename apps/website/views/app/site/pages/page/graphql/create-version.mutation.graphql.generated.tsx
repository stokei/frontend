import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateVersionMutationVariables = Types.Exact<{
  input: Types.CreateVersionInput;
}>;


export type CreateVersionMutation = { __typename?: 'Mutation', createVersion: { __typename?: 'Version', id: string } };


export const CreateVersionDocument = gql`
    mutation CreateVersion($input: CreateVersionInput!) {
  createVersion(input: $input) {
    id
  }
}
    `;

export function useCreateVersionMutation() {
  return Urql.useMutation<CreateVersionMutation, CreateVersionMutationVariables>(CreateVersionDocument);
};