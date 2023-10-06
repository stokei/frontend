import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type BuilderComponentCatalogQueryVariables = Types.Exact<{
  catalog: Types.Scalars['String'];
}>;


export type BuilderComponentCatalogQuery = { __typename?: 'Query', catalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null } };

export type BuilderComponentCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null };

export const BuilderComponentCatalogFragmentDoc = gql`
    fragment BuilderComponentCatalog on Catalog {
  id
  title
  subtitle
}
    `;
export const BuilderComponentCatalogDocument = gql`
    query BuilderComponentCatalog($catalog: String!) {
  catalog(id: $catalog) {
    ...BuilderComponentCatalog
  }
}
    ${BuilderComponentCatalogFragmentDoc}`;

export function useBuilderComponentCatalogQuery(options: Omit<Urql.UseQueryArgs<BuilderComponentCatalogQueryVariables>, 'query'>) {
  return Urql.useQuery<BuilderComponentCatalogQuery, BuilderComponentCatalogQueryVariables>({ query: BuilderComponentCatalogDocument, ...options });
};