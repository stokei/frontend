import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateSubscriptionContractMutationVariables = Types.Exact<{
  input: Types.CreateSubscriptionContractInput;
}>;


export type CreateSubscriptionContractMutation = { __typename?: 'Mutation', createSubscriptionContract: { __typename?: 'SubscriptionContract', id: string, active: boolean, app?: { __typename?: 'App', name: string } | null } };


export const CreateSubscriptionContractDocument = gql`
    mutation CreateSubscriptionContract($input: CreateSubscriptionContractInput!) {
  createSubscriptionContract(input: $input) {
    id
    active
    app {
      name
    }
  }
}
    `;

export function useCreateSubscriptionContractMutation() {
  return Urql.useMutation<CreateSubscriptionContractMutation, CreateSubscriptionContractMutationVariables>(CreateSubscriptionContractDocument);
};