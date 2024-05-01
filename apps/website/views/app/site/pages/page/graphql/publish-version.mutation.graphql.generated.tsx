import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PublishVersionMutationVariables = Types.Exact<{
  input: Types.PublishVersionInput;
}>;


export type PublishVersionMutation = { __typename?: 'Mutation', publishVersion: { __typename?: 'Version', id: string } };


export const PublishVersionDocument = gql`
    mutation PublishVersion($input: PublishVersionInput!) {
  publishVersion(input: $input) {
    id
  }
}
    `;

export function usePublishVersionMutation() {
  return Urql.useMutation<PublishVersionMutation, PublishVersionMutationVariables>(PublishVersionDocument);
};