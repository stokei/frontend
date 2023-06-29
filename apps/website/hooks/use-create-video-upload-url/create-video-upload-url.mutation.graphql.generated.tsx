import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateVideoUploadUrlMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateVideoUploadUrlMutation = { __typename?: 'Mutation', response: { __typename?: 'CreateFileUploadURLResponse', uploadURL: string, file: { __typename?: 'File', id: string, filename: string } } };


export const CreateVideoUploadUrlDocument = gql`
    mutation CreateVideoUploadURL {
  response: createVideoUploadURL {
    uploadURL
    file {
      id
      filename
    }
  }
}
    `;

export function useCreateVideoUploadUrlMutation() {
  return Urql.useMutation<CreateVideoUploadUrlMutation, CreateVideoUploadUrlMutationVariables>(CreateVideoUploadUrlDocument);
};