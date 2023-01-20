import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentAppQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentAppQuery = { __typename?: 'Query', currentApp: { __typename?: 'App', id: string, name: string } };


export const CurrentAppDocument = gql`
    query CurrentApp {
  currentApp {
    id
    name
  }
}
    `;

export function useCurrentAppQuery(options?: Omit<Urql.UseQueryArgs<CurrentAppQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentAppQuery, CurrentAppQueryVariables>({ query: CurrentAppDocument, ...options });
};