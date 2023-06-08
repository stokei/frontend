import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMemberFragmentDoc } from './member.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAccountMutationVariables = Types.Exact<{
  input: Types.CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, email: string, username: string, status: Types.AccountStatus, createdAt?: string | null, isStokei: boolean, isOwner?: boolean | null, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', id: string, name: string }> | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ...AppMember
  }
}
    ${AppMemberFragmentDoc}`;

export function useCreateAccountMutation() {
  return Urql.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument);
};