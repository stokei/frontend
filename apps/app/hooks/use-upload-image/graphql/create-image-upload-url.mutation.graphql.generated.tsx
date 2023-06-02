import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { UseUploadImageFileFragmentDoc } from './create-image.mutation.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UseUploadImageCreateImageUploadUrlMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UseUploadImageCreateImageUploadUrlMutation = { __typename?: 'Mutation', createImageUploadURL: { __typename?: 'CreateFileUploadURLResponse', uploadURL: string, file: { __typename?: 'File', id: string, filename: string, url?: string | null } } };


export const UseUploadImageCreateImageUploadUrlDocument = gql`
    mutation UseUploadImageCreateImageUploadURL {
  createImageUploadURL {
    uploadURL
    file {
      ...UseUploadImageFile
    }
  }
}
    ${UseUploadImageFileFragmentDoc}`;

export function useUseUploadImageCreateImageUploadUrlMutation() {
  return Urql.useMutation<UseUploadImageCreateImageUploadUrlMutation, UseUploadImageCreateImageUploadUrlMutationVariables>(UseUploadImageCreateImageUploadUrlDocument);
};