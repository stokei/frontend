import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateComponentsOrderMutationVariables = Types.Exact<{
  input: Types.UpdateComponentsOrderInput;
}>;


export type UpdateComponentsOrderMutation = { __typename?: 'Mutation', updateComponentsOrder: Array<{ __typename?: 'Component', id: string }> };


export const UpdateComponentsOrderDocument = gql`
    mutation UpdateComponentsOrder($input: UpdateComponentsOrderInput!) {
  updateComponentsOrder(input: $input) {
    id
  }
}
    `;

export function useUpdateComponentsOrderMutation() {
  return Urql.useMutation<UpdateComponentsOrderMutation, UpdateComponentsOrderMutationVariables>(UpdateComponentsOrderDocument);
};