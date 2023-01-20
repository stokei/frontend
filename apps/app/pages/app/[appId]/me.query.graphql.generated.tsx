import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MeAccountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeAccountQuery = { __typename?: 'Query', me: { __typename?: 'MeAccount', id: string, firstname: string, lastname: string, fullname: string, email: string, username: string } };


export const MeAccountDocument = gql`
    query MeAccount {
  me {
    id
    firstname
    lastname
    fullname
    email
    username
  }
}
    `;

export function useMeAccountQuery(options?: Omit<Urql.UseQueryArgs<MeAccountQueryVariables>, 'query'>) {
  return Urql.useQuery<MeAccountQuery, MeAccountQueryVariables>({ query: MeAccountDocument, ...options });
};