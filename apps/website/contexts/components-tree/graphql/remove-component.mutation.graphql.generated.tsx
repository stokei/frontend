import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveComponentMutationVariables = Types.Exact<{
  input: Types.RemoveComponentInput;
}>;


export type RemoveComponentMutation = { __typename?: 'Mutation', removeComponent: { __typename?: 'Component', id: string } };


export const RemoveComponentDocument = gql`
    mutation RemoveComponent($input: RemoveComponentInput!) {
  removeComponent(input: $input) {
    id
  }
}
    `;

export function useRemoveComponentMutation() {
  return Urql.useMutation<RemoveComponentMutation, RemoveComponentMutationVariables>(RemoveComponentDocument);
};