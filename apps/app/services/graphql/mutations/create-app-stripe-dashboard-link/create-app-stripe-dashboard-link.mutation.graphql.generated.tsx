import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAppStripeDashboardLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateAppStripeDashboardLinkMutation = { __typename?: 'Mutation', createAppStripeDashboardLink: { __typename?: 'Link', url: string } };


export const CreateAppStripeDashboardLinkDocument = gql`
    mutation CreateAppStripeDashboardLink {
  createAppStripeDashboardLink {
    url
  }
}
    `;

export function useCreateAppStripeDashboardLinkMutation() {
  return Urql.useMutation<CreateAppStripeDashboardLinkMutation, CreateAppStripeDashboardLinkMutationVariables>(CreateAppStripeDashboardLinkDocument);
};