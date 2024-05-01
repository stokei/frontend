import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveVersionMutationVariables = Types.Exact<{
  input: Types.RemoveVersionInput;
}>;


export type RemoveVersionMutation = { __typename?: 'Mutation', removeVersion: { __typename?: 'Version', id: string } };


export const RemoveVersionDocument = gql`
    mutation RemoveVersion($input: RemoveVersionInput!) {
  removeVersion(input: $input) {
    id
  }
}
    `;

export function useRemoveVersionMutation() {
  return Urql.useMutation<RemoveVersionMutation, RemoveVersionMutationVariables>(RemoveVersionDocument);
};