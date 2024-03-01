import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPageBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
  site: Types.Scalars['String'];
}>;


export type GetPageBySlugQuery = { __typename?: 'Query', page: { __typename?: 'Page', id: string, version?: { __typename?: 'Version', id: string } | null } };


export const GetPageBySlugDocument = gql`
    query GetPageBySlug($slug: String!, $site: String!) {
  page(slug: $slug, site: $site) {
    id
    version {
      id
    }
  }
}
    `;

export function useGetPageBySlugQuery(options: Omit<Urql.UseQueryArgs<GetPageBySlugQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPageBySlugQuery, GetPageBySlugQueryVariables>({ query: GetPageBySlugDocument, ...options });
};