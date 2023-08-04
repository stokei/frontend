import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAppPagarmeAccountMutationVariables = Types.Exact<{
  input: Types.CreateAppPagarmeAccountInput;
}>;


export type CreateAppPagarmeAccountMutation = { __typename?: 'Mutation', createAppPagarmeAccount: { __typename?: 'App', id: string } };


export const CreateAppPagarmeAccountDocument = gql`
    mutation CreateAppPagarmeAccount($input: CreateAppPagarmeAccountInput!) {
  createAppPagarmeAccount(input: $input) {
    id
  }
}
    `;

export function useCreateAppPagarmeAccountMutation() {
  return Urql.useMutation<CreateAppPagarmeAccountMutation, CreateAppPagarmeAccountMutationVariables>(CreateAppPagarmeAccountDocument);
};