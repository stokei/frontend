import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SitePagesPageFragmentDoc } from '../../pages/graphql/pages.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemovePageMutationVariables = Types.Exact<{
  input: Types.RemovePageInput;
}>;


export type RemovePageMutation = { __typename?: 'Mutation', removePage: { __typename?: 'Page', id: string, parent: string, title: string, slug: string, version?: { __typename?: 'Version', id: string, name: string } | null } };


export const RemovePageDocument = gql`
    mutation RemovePage($input: RemovePageInput!) {
  removePage(input: $input) {
    ...SitePagesPage
  }
}
    ${SitePagesPageFragmentDoc}`;

export function useRemovePageMutation() {
  return Urql.useMutation<RemovePageMutation, RemovePageMutationVariables>(RemovePageDocument);
};