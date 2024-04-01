import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SitePagesPageFragmentDoc } from '../../pages/graphql/pages.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput;
}>;


export type UpdatePageMutation = { __typename?: 'Mutation', updatePage: { __typename?: 'Page', id: string, parent: string, title: string, slug: string, version?: { __typename?: 'Version', name: string } | null } };


export const UpdatePageDocument = gql`
    mutation UpdatePage($input: UpdatePageInput!) {
  updatePage(input: $input) {
    ...SitePagesPage
  }
}
    ${SitePagesPageFragmentDoc}`;

export function useUpdatePageMutation() {
  return Urql.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument);
};