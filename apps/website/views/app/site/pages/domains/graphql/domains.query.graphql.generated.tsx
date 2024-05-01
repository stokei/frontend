import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppDomainsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllDomainsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllDomainsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppDomainsQuery = { __typename?: 'Query', domains: { __typename?: 'Domains', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null }> | null } };

export type AppDomainFragment = { __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null };

export const AppDomainFragmentDoc = gql`
    fragment AppDomain on Domain {
  id
  name
  url
  free
  active
  status
  createdAt
  activatedAt
}
    `;
export const GetAppDomainsDocument = gql`
    query GetAppDomains($where: WhereDataFindAllDomainsInput, $orderBy: OrderByDataFindAllDomainsInput, $page: PaginationInput) {
  domains(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppDomain
    }
  }
}
    ${AppDomainFragmentDoc}`;

export function useGetAppDomainsQuery(options?: Omit<Urql.UseQueryArgs<GetAppDomainsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppDomainsQuery, GetAppDomainsQueryVariables>({ query: GetAppDomainsDocument, ...options });
};