import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateVideoMutationVariables = Types.Exact<{
  input: Types.CreateVideoInput;
}>;


export type CreateVideoMutation = { __typename?: 'Mutation', createVideo: { __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null } };


export const CreateVideoDocument = gql`
    mutation CreateVideo($input: CreateVideoInput!) {
  createVideo(input: $input) {
    id
    name
    private
    active
    poster {
      id
      file {
        url
      }
    }
    file {
      url
      duration
    }
  }
}
    `;

export function useCreateVideoMutation() {
  return Urql.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument);
};