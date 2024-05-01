import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateComponentMutationVariables = Types.Exact<{
  input: Types.UpdateComponentInput;
}>;


export type UpdateComponentMutation = { __typename?: 'Mutation', updateComponent: { __typename?: 'Component', id: string } };


export const UpdateComponentDocument = gql`
    mutation UpdateComponent($input: UpdateComponentInput!) {
  updateComponent(input: $input) {
    id
  }
}
    `;

export function useUpdateComponentMutation() {
  return Urql.useMutation<UpdateComponentMutation, UpdateComponentMutationVariables>(UpdateComponentDocument);
};