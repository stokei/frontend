import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CompleteAccountConfigurationMutationVariables = Types.Exact<{
  input: Types.CompleteAccountConfigurationInput;
}>;


export type CompleteAccountConfigurationMutation = { __typename?: 'Mutation', completeAccountConfiguration: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string, prefixToken: string, account: { __typename?: 'MeAccount', id: string, fullname: string, isOwner?: boolean | null, email: string, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } } } };


export const CompleteAccountConfigurationDocument = gql`
    mutation CompleteAccountConfiguration($input: CompleteAccountConfigurationInput!) {
  completeAccountConfiguration(input: $input) {
    accessToken
    refreshToken
    prefixToken
    account {
      id
      fullname
      isOwner
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

export function useCompleteAccountConfigurationMutation() {
  return Urql.useMutation<CompleteAccountConfigurationMutation, CompleteAccountConfigurationMutationVariables>(CompleteAccountConfigurationDocument);
};