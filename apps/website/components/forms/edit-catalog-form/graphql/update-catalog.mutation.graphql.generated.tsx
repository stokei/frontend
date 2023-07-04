import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditCatalogFormUpdateCatalogMutationVariables = Types.Exact<{
  input: Types.UpdateCatalogInput;
}>;


export type EditCatalogFormUpdateCatalogMutation = { __typename?: 'Mutation', updateCatalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null } };


export const EditCatalogFormUpdateCatalogDocument = gql`
    mutation EditCatalogFormUpdateCatalog($input: UpdateCatalogInput!) {
  updateCatalog(input: $input) {
    id
    title
    subtitle
  }
}
    `;

export function useEditCatalogFormUpdateCatalogMutation() {
  return Urql.useMutation<EditCatalogFormUpdateCatalogMutation, EditCatalogFormUpdateCatalogMutationVariables>(EditCatalogFormUpdateCatalogDocument);
};