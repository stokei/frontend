import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCatalogsPageCatalogFragmentDoc } from './catalogs.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AdminCatalogsPageCreateCatalogMutationVariables = Types.Exact<{
  input: Types.CreateCatalogInput;
}>;


export type AdminCatalogsPageCreateCatalogMutation = { __typename?: 'Mutation', createCatalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null } };


export const AdminCatalogsPageCreateCatalogDocument = gql`
    mutation AdminCatalogsPageCreateCatalog($input: CreateCatalogInput!) {
  createCatalog(input: $input) {
    ...AdminCatalogsPageCatalog
  }
}
    ${AdminCatalogsPageCatalogFragmentDoc}`;

export function useAdminCatalogsPageCreateCatalogMutation() {
  return Urql.useMutation<AdminCatalogsPageCreateCatalogMutation, AdminCatalogsPageCreateCatalogMutationVariables>(AdminCatalogsPageCreateCatalogDocument);
};