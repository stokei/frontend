import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCatalogPageCatalogItemFragmentDoc } from './catalog-items.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCatalogItemMutationVariables = Types.Exact<{
  input: Types.CreateCatalogItemInput;
}>;


export type CreateCatalogItemMutation = { __typename?: 'Mutation', createCatalogItem: { __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, parent?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null } } };


export const CreateCatalogItemDocument = gql`
    mutation CreateCatalogItem($input: CreateCatalogItemInput!) {
  createCatalogItem(input: $input) {
    ...AdminCatalogPageCatalogItem
  }
}
    ${AdminCatalogPageCatalogItemFragmentDoc}`;

export function useCreateCatalogItemMutation() {
  return Urql.useMutation<CreateCatalogItemMutation, CreateCatalogItemMutationVariables>(CreateCatalogItemDocument);
};