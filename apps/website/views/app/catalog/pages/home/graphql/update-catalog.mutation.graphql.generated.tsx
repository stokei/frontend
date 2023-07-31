import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CatalogPageCatalogFragmentDoc } from '../../../graphql/catalog.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AdminCatalogPageUpdateCatalogMutationVariables = Types.Exact<{
  input: Types.UpdateCatalogInput;
}>;


export type AdminCatalogPageUpdateCatalogMutation = { __typename?: 'Mutation', updateCatalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null } };


export const AdminCatalogPageUpdateCatalogDocument = gql`
    mutation AdminCatalogPageUpdateCatalog($input: UpdateCatalogInput!) {
  updateCatalog(input: $input) {
    ...CatalogPageCatalog
  }
}
    ${CatalogPageCatalogFragmentDoc}`;

export function useAdminCatalogPageUpdateCatalogMutation() {
  return Urql.useMutation<AdminCatalogPageUpdateCatalogMutation, AdminCatalogPageUpdateCatalogMutationVariables>(AdminCatalogPageUpdateCatalogDocument);
};