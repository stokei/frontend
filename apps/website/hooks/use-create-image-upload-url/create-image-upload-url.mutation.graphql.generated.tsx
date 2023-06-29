import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateImageUploadUrlMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateImageUploadUrlMutation = { __typename?: 'Mutation', response: { __typename?: 'CreateFileUploadURLResponse', uploadURL: string, file: { __typename?: 'File', id: string, filename: string } } };


export const CreateImageUploadUrlDocument = gql`
    mutation CreateImageUploadURL {
  response: createImageUploadURL {
    uploadURL
    file {
      id
      filename
    }
  }
}
    `;

export function useCreateImageUploadUrlMutation() {
  return Urql.useMutation<CreateImageUploadUrlMutation, CreateImageUploadUrlMutationVariables>(CreateImageUploadUrlDocument);
};