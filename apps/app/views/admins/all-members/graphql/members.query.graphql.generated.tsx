import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMemberFragmentDoc } from './member.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppMembersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAccountsInput>;
}>;


export type GetAppMembersQuery = { __typename?: 'Query', accounts: { __typename?: 'Accounts', items?: Array<{ __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, email: string, username: string, status: Types.AccountStatus, createdAt?: string | null, isStokei: boolean, isAdmin?: boolean | null, isOwner?: boolean | null, isInstructor?: boolean | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };


export const GetAppMembersDocument = gql`
    query GetAppMembers($where: WhereDataFindAllAccountsInput) {
  accounts(where: $where) {
    items {
      ...AppMember
    }
  }
}
    ${AppMemberFragmentDoc}`;

export function useGetAppMembersQuery(options?: Omit<Urql.UseQueryArgs<GetAppMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppMembersQuery, GetAppMembersQueryVariables>({ query: GetAppMembersDocument, ...options });
};