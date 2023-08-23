import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAccountPagarmeCustomerMutationVariables = Types.Exact<{
  input: Types.CreateAccountPagarmeCustomerInput;
}>;


export type CreateAccountPagarmeCustomerMutation = { __typename?: 'Mutation', createAccountPagarmeCustomer: { __typename?: 'Account', id: string } };


export const CreateAccountPagarmeCustomerDocument = gql`
    mutation CreateAccountPagarmeCustomer($input: CreateAccountPagarmeCustomerInput!) {
  createAccountPagarmeCustomer(input: $input) {
    id
  }
}
    `;

export function useCreateAccountPagarmeCustomerMutation() {
  return Urql.useMutation<CreateAccountPagarmeCustomerMutation, CreateAccountPagarmeCustomerMutationVariables>(CreateAccountPagarmeCustomerDocument);
};