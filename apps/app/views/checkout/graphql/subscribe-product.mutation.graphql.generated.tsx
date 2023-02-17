import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubscribeProductMutationVariables = Types.Exact<{
  input: Types.SubscribeProductInput;
}>;


export type SubscribeProductMutation = { __typename?: 'Mutation', subscribeProduct: { __typename?: 'Checkout', clientSecret: string, subscriptionContract: { __typename?: 'SubscriptionContract', id: string, active: boolean, status: Types.SubscriptionContractStatus, type: Types.SubscriptionContractType, lastInvoice?: { __typename?: 'Invoice', id: string } | null } } };


export const SubscribeProductDocument = gql`
    mutation SubscribeProduct($input: SubscribeProductInput!) {
  subscribeProduct(input: $input) {
    clientSecret
    subscriptionContract {
      id
      active
      status
      type
      lastInvoice {
        id
      }
    }
  }
}
    `;

export function useSubscribeProductMutation() {
  return Urql.useMutation<SubscribeProductMutation, SubscribeProductMutationVariables>(SubscribeProductDocument);
};