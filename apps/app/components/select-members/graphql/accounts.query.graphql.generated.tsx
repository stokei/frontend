import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppAccountsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAccountsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllAccountsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppAccountsQuery = { __typename?: 'Query', accounts: { __typename?: 'Accounts', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };

export type AppAccountFragment = { __typename?: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppAccountFragmentDoc = gql`
    fragment AppAccount on Account {
  id
  firstname
  fullname
  appEmail: email
  avatar {
    file {
      url
    }
  }
}
    `;
export const GetAppAccountsDocument = gql`
    query GetAppAccounts($where: WhereDataFindAllAccountsInput, $orderBy: OrderByDataFindAllAccountsInput, $page: PaginationInput) {
  accounts(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppAccount
    }
  }
}
    ${AppAccountFragmentDoc}`;

export function useGetAppAccountsQuery(options?: Omit<Urql.UseQueryArgs<GetAppAccountsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppAccountsQuery, GetAppAccountsQueryVariables>({ query: GetAppAccountsDocument, ...options });
};