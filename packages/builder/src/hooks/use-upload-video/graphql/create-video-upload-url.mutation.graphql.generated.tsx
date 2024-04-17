import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UseUploadVideoCreateVideoUploadUrlMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UseUploadVideoCreateVideoUploadUrlMutation = { __typename?: 'Mutation', createVideoUploadURL: { __typename?: 'CreateFileUploadURLResponse', uploadURL: string, file: { __typename?: 'File', id: string, filename: string, url?: string | null } } };

export type UseUploadVideoFileFragment = { __typename?: 'File', id: string, filename: string, url?: string | null };

export const UseUploadVideoFileFragmentDoc = gql`
    fragment UseUploadVideoFile on File {
  id
  filename
  url
}
    `;
export const UseUploadVideoCreateVideoUploadUrlDocument = gql`
    mutation UseUploadVideoCreateVideoUploadURL {
  createVideoUploadURL {
    uploadURL
    file {
      ...UseUploadVideoFile
    }
  }
}
    ${UseUploadVideoFileFragmentDoc}`;

export function useUseUploadVideoCreateVideoUploadUrlMutation() {
  return Urql.useMutation<UseUploadVideoCreateVideoUploadUrlMutation, UseUploadVideoCreateVideoUploadUrlMutationVariables>(UseUploadVideoCreateVideoUploadUrlDocument);
};