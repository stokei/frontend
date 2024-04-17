import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { UseUploadImageFileFragmentDoc } from './create-image.mutation.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UseUploadImageUpdateFileMutationVariables = Types.Exact<{
  input: Types.UpdateFileInput;
}>;


export type UseUploadImageUpdateFileMutation = { __typename?: 'Mutation', updateFile: { __typename?: 'File', id: string, filename: string, url?: string | null } };


export const UseUploadImageUpdateFileDocument = gql`
    mutation UseUploadImageUpdateFile($input: UpdateFileInput!) {
  updateFile(input: $input) {
    ...UseUploadImageFile
  }
}
    ${UseUploadImageFileFragmentDoc}`;

export function useUseUploadImageUpdateFileMutation() {
  return Urql.useMutation<UseUploadImageUpdateFileMutation, UseUploadImageUpdateFileMutationVariables>(UseUploadImageUpdateFileDocument);
};