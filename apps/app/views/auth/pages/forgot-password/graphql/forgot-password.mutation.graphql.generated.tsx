import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ForgotPasswordMutationVariables = Types.Exact<{
  input: Types.ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };


export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};