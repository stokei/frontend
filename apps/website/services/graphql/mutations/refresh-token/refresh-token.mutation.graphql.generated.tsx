import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RefreshAccessMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type RefreshAccessMutation = { __typename?: 'Mutation', response: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, prefixToken: string } };


export const RefreshAccessDocument = gql`
    mutation RefreshAccess {
  response: refreshAccess {
    accessToken
    refreshToken
    prefixToken
  }
}
    `;

export function useRefreshAccessMutation() {
  return Urql.useMutation<RefreshAccessMutation, RefreshAccessMutationVariables>(RefreshAccessDocument);
};