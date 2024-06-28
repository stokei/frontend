import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateFileDownloadUrlMutationVariables = Types.Exact<{
  input: Types.CreateFileDownloadUrlInput;
}>;


export type CreateFileDownloadUrlMutation = { __typename?: 'Mutation', url: string };


export const CreateFileDownloadUrlDocument = gql`
    mutation CreateFileDownloadURL($input: CreateFileDownloadURLInput!) {
  url: createFileDownloadURL(input: $input)
}
    `;

export function useCreateFileDownloadUrlMutation() {
  return Urql.useMutation<CreateFileDownloadUrlMutation, CreateFileDownloadUrlMutationVariables>(CreateFileDownloadUrlDocument);
};