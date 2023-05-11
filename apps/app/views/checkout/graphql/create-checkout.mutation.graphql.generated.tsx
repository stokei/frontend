import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCheckoutMutationVariables = Types.Exact<{
  input: Types.CreateCheckoutInput;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', createCheckout: { __typename?: 'Checkout', url: string } };


export const CreateCheckoutDocument = gql`
    mutation CreateCheckout($input: CreateCheckoutInput!) {
  createCheckout(input: $input) {
    url
  }
}
    `;

export function useCreateCheckoutMutation() {
  return Urql.useMutation<CreateCheckoutMutation, CreateCheckoutMutationVariables>(CreateCheckoutDocument);
};