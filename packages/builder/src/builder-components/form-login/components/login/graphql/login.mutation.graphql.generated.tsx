import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, prefixToken: string, account: { __typename?: 'MeAccount', id: string, fullname: string, isOwner?: boolean | null, status: Types.AccountStatus, email: string, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } } } };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    prefixToken
    account {
      id
      fullname
      isOwner
      status
      roles {
        totalCount
        items {
          name
        }
      }
      app {
        id
        name
      }
      email
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};