import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCatalogPageCatalogItemFragmentDoc } from './catalog-items.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveCatalogItemMutationVariables = Types.Exact<{
  input: Types.RemoveCatalogItemInput;
}>;


export type RemoveCatalogItemMutation = { __typename?: 'Mutation', removeCatalogItem: { __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, parent?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null } } };


export const RemoveCatalogItemDocument = gql`
    mutation RemoveCatalogItem($input: RemoveCatalogItemInput!) {
  removeCatalogItem(input: $input) {
    ...AdminCatalogPageCatalogItem
  }
}
    ${AdminCatalogPageCatalogItemFragmentDoc}`;

export function useRemoveCatalogItemMutation() {
  return Urql.useMutation<RemoveCatalogItemMutation, RemoveCatalogItemMutationVariables>(RemoveCatalogItemDocument);
};