import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentAccountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentAccountQuery = { __typename?: 'Query', me: { __typename?: 'MeAccount', id: string, isAdmin?: boolean | null, isInstructor?: boolean | null, firstname: string, lastname: string, fullname: string, isStokei: boolean, email: string, username: string, status: Types.AccountStatus, createdAt?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const CurrentAccountDocument = gql`
    query CurrentAccount {
  me {
    id
    isAdmin
    isInstructor
    firstname
    lastname
    fullname
    isStokei
    email
    username
    status
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