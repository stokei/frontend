import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignUpMutationVariables = Types.Exact<{
  input: Types.SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthResponse', accessToken: string, prefixToken: string, refreshToken: string, account: { __typename?: 'MeAccount', id: string, fullname: string, isAdmin?: boolean | null, email: string, app: { __typename?: 'App', id: string, name: string } } } };


export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    accessToken
    prefixToken
    refreshToken
    account {
      id
      fullname
      isAdmin
      app {
        id
        name
      }
      email
    }
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};