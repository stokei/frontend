import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SitePagesPageFragmentDoc } from './pages.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreatePageMutationVariables = Types.Exact<{
  input: Types.CreatePageInput;
}>;


export type CreatePageMutation = { __typename?: 'Mutation', createPage: { __typename?: 'Page', id: string, parent: string, title: string, url?: string | null, type: Types.PageType, slug: string, version?: { __typename?: 'Version', id: string, name: string } | null } };


export const CreatePageDocument = gql`
    mutation CreatePage($input: CreatePageInput!) {
  createPage(input: $input) {
    ...SitePagesPage
  }
}
    ${SitePagesPageFragmentDoc}`;

export function useCreatePageMutation() {
  return Urql.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageDocument);
};