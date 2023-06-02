import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UseUploadImageCreateImageMutationVariables = Types.Exact<{
  input: Types.CreateImageInput;
}>;


export type UseUploadImageCreateImageMutation = { __typename?: 'Mutation', createImage: { __typename?: 'Image', id: string, file: { __typename?: 'File', id: string, filename: string, url?: string | null } } };

export type UseUploadImageFileFragment = { __typename?: 'File', id: string, filename: string, url?: string | null };

export type UseUploadImageFragment = { __typename?: 'Image', id: string, file: { __typename?: 'File', id: string, filename: string, url?: string | null } };

export const UseUploadImageFileFragmentDoc = gql`
    fragment UseUploadImageFile on File {
  id
  filename
  url
}
    `;
export const UseUploadImageFragmentDoc = gql`
    fragment UseUploadImage on Image {
  id
  file {
    ...UseUploadImageFile
  }
}
    ${UseUploadImageFileFragmentDoc}`;
export const UseUploadImageCreateImageDocument = gql`
    mutation UseUploadImageCreateImage($input: CreateImageInput!) {
  createImage(input: $input) {
    ...UseUploadImage
  }
}
    ${UseUploadImageFragmentDoc}`;

export function useUseUploadImageCreateImageMutation() {
  return Urql.useMutation<UseUploadImageCreateImageMutation, UseUploadImageCreateImageMutationVariables>(UseUploadImageCreateImageDocument);
};