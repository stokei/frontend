import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateVersionMutationVariables = Types.Exact<{
  input: Types.UpdateVersionInput;
}>;


export type UpdateVersionMutation = { __typename?: 'Mutation', updateVersion: { __typename?: 'Version', id: string, name: string } };


export const UpdateVersionDocument = gql`
    mutation UpdateVersion($input: UpdateVersionInput!) {
  updateVersion(input: $input) {
    id
    name
  }
}
    `;

export function useUpdateVersionMutation() {
  return Urql.useMutation<UpdateVersionMutation, UpdateVersionMutationVariables>(UpdateVersionDocument);
};