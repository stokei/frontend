import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateSiteMutationVariables = Types.Exact<{
  input: Types.CreateSiteInput;
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename?: 'Site', id: string } };


export const CreateSiteDocument = gql`
    mutation CreateSite($input: CreateSiteInput!) {
  createSite(input: $input) {
    id
  }
}
    `;

export function useCreateSiteMutation() {
  return Urql.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument);
};