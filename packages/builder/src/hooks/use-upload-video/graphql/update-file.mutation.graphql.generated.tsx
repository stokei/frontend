import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { UseUploadVideoFileFragmentDoc } from './create-video-upload-url.mutation.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UseUploadVideoUpdateFileMutationVariables = Types.Exact<{
  input: Types.UpdateFileInput;
}>;


export type UseUploadVideoUpdateFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'File', id: string, filename: string, url?: string | null } };


export const UseUploadVideoUpdateFileDocument = gql`
    mutation UseUploadVideoUpdateFile($input: UpdateFileInput!) {
  updateFile(input: $input) {
    ...UseUploadVideoFile
  }
}
    ${UseUploadVideoFileFragmentDoc}`;

export function useUseUploadVideoUpdateFileMutation() {
  return Urql.useMutation<UseUploadVideoUpdateFileMutation, UseUploadVideoUpdateFileMutationVariables>(UseUploadVideoUpdateFileDocument);
};