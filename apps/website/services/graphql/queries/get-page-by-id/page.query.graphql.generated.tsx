import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPageByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetPageByIdQuery = { __typename?: 'Query', page: { __typename?: 'Page', id: string, title: string, slug: string, canRemove?: boolean | null, version?: { __typename?: 'Version', id: string } | null } };

export type GlobalPageFragment = { __typename?: 'Page', id: string, title: string, slug: string, canRemove?: boolean | null, version?: { __typename?: 'Version', id: string } | null };

export const GlobalPageFragmentDoc = gql`
    fragment GlobalPage on Page {
  id
  title
  slug
  canRemove
  version {
    id
  }
}
    `;
export const GetPageByIdDocument = gql`
    query GetPageById($id: String!) {
  page(id: $id) {
    ...GlobalPage
  }
}
    ${GlobalPageFragmentDoc}`;

export function useGetPageByIdQuery(options: Omit<Urql.UseQueryArgs<GetPageByIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPageByIdQuery, GetPageByIdQueryVariables>({ query: GetPageByIdDocument, ...options });
};