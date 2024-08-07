import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppMemberFragmentDoc } from './member.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppMembersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAccountsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllAccountsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppMembersQuery = { __typename?: 'Query', accounts: { __typename?: 'Accounts', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, email: string, username: string, status: Types.AccountStatus, createdAt?: string | null, isStokei: boolean, isOwner?: boolean | null, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', id: string, name: string }> | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };


export const GetAppMembersDocument = gql`
    query GetAppMembers($where: WhereDataFindAllAccountsInput, $orderBy: OrderByDataFindAllAccountsInput, $page: PaginationInput) {
  accounts(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppMember
    }
  }
}
    ${AppMemberFragmentDoc}`;

export function useGetAppMembersQuery(options?: Omit<Urql.UseQueryArgs<GetAppMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppMembersQuery, GetAppMembersQueryVariables>({ query: GetAppMembersDocument, ...options });
};