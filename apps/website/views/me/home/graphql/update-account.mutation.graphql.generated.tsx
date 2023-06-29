import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAccountMutationVariables = Types.Exact<{
  input: Types.UpdateAccountInput;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, fullname: string, isOwner?: boolean | null, email: string, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } } };


export const UpdateAccountDocument = gql`
    mutation UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
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
    `;

export function useUpdateAccountMutation() {
  return Urql.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument);
};