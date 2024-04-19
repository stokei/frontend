import * as Types from '../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPageQueryVariables = Types.Exact<{
  page: Types.Scalars['String'];
}>;


export type GetPageQuery = { __typename?: 'Query', page: { __typename?: 'Page', id: string, title: string, slug: string, parent: string, app?: { __typename?: 'App', id: string } | null } };


export const GetPageDocument = gql`
    query GetPage($page: String!) {
  page(id: $page) {
    id
    title
    slug
    parent
    app {
      id
    }
  }
}
    `;

export function useGetPageQuery(options: Omit<Urql.UseQueryArgs<GetPageQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPageQuery, GetPageQueryVariables>({ query: GetPageDocument, ...options });
};