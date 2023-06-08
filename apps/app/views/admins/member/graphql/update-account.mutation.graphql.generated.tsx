import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { MemberPageMemberFragmentDoc } from './member.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MemberPageUpdateAccountMutationVariables = Types.Exact<{
  input: Types.UpdateAccountInput;
}>;


export type MemberPageUpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, isOwner?: boolean | null, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } } };


export const MemberPageUpdateAccountDocument = gql`
    mutation MemberPageUpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ...MemberPageMember
  }
}
    ${MemberPageMemberFragmentDoc}`;

export function useMemberPageUpdateAccountMutation() {
  return Urql.useMutation<MemberPageUpdateAccountMutation, MemberPageUpdateAccountMutationVariables>(MemberPageUpdateAccountDocument);
};