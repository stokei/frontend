import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetMembersTotalQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAccountsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetMembersTotalQuery = { __typename?: 'Query', accounts: { __typename?: 'Accounts', totalCount: number } };


export const GetMembersTotalDocument = gql`
    query GetMembersTotal($where: WhereDataFindAllAccountsInput, $page: PaginationInput) {
  accounts(where: $where, page: $page) {
    totalCount
  }
}
    `;

export function useGetMembersTotalQuery(options?: Omit<Urql.UseQueryArgs<GetMembersTotalQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMembersTotalQuery, GetMembersTotalQueryVariables>({ query: GetMembersTotalDocument, ...options });
};