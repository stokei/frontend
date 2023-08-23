import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentAccountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentAccountQuery = { __typename?: 'Query', me: { __typename?: 'MeAccount', id: string, firstname: string, lastname: string, fullname: string, isStokei: boolean, isOwner?: boolean | null, email: string, username: string, status: Types.AccountStatus, pagarmeCustomer?: string | null, createdAt?: string | null, app: { __typename?: 'App', id: string }, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const CurrentAccountDocument = gql`
    query CurrentAccount {
  me {
    id
    firstname
    lastname
    fullname
    isStokei
    isOwner
    email
    username
    status
    pagarmeCustomer
    app {
      id
    }
    roles {
      totalCount
      items {
        name
      }
    }
    createdAt
    avatar {
      file {
        url
      }
    }
  }
}
    `;

export function useCurrentAccountQuery(options?: Omit<Urql.UseQueryArgs<CurrentAccountQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentAccountQuery, CurrentAccountQueryVariables>({ query: CurrentAccountDocument, ...options });
};