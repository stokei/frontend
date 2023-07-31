import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCatalogPageCatalogQueryVariables = Types.Exact<{
  catalog: Types.Scalars['String'];
}>;


export type GetCatalogPageCatalogQuery = { __typename?: 'Query', catalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null } };

export type CatalogPageCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null };

export const CatalogPageCatalogFragmentDoc = gql`
    fragment CatalogPageCatalog on Catalog {
  id
  title
  subtitle
}
    `;
export const GetCatalogPageCatalogDocument = gql`
    query GetCatalogPageCatalog($catalog: String!) {
  catalog(id: $catalog) {
    ...CatalogPageCatalog
  }
}
    ${CatalogPageCatalogFragmentDoc}`;

export function useGetCatalogPageCatalogQuery(options: Omit<Urql.UseQueryArgs<GetCatalogPageCatalogQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCatalogPageCatalogQuery, GetCatalogPageCatalogQueryVariables>({ query: GetCatalogPageCatalogDocument, ...options });
};