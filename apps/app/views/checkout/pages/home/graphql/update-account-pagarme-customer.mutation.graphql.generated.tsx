import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAccountPagarmeCustomerMutationVariables = Types.Exact<{
  input: Types.UpdateAccountPagarmeCustomerInput;
}>;


export type UpdateAccountPagarmeCustomerMutation = { __typename?: 'Mutation', updateAccountPagarmeCustomer: { __typename?: 'Account', id: string } };


export const UpdateAccountPagarmeCustomerDocument = gql`
    mutation UpdateAccountPagarmeCustomer($input: UpdateAccountPagarmeCustomerInput!) {
  updateAccountPagarmeCustomer(input: $input) {
    id
  }
}
    `;

export function useUpdateAccountPagarmeCustomerMutation() {
  return Urql.useMutation<UpdateAccountPagarmeCustomerMutation, UpdateAccountPagarmeCustomerMutationVariables>(UpdateAccountPagarmeCustomerDocument);
};