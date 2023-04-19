import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateImageMutationVariables = Types.Exact<{
  input: Types.CreateImageInput;
}>;


export type CreateImageMutation = { __typename?: 'Mutation', createImage: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null, duration?: number | null } } };


export const CreateImageDocument = gql`
    mutation CreateImage($input: CreateImageInput!) {
  createImage(input: $input) {
    id
    file {
      url
      duration
    }
  }
}
    `;

export function useCreateImageMutation() {
  return Urql.useMutation<CreateImageMutation, CreateImageMutationVariables>(CreateImageDocument);
};