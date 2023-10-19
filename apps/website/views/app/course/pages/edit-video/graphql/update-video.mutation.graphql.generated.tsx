import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageEditVideoFragmentDoc } from './video.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateVideoMutationVariables = Types.Exact<{
  input: Types.UpdateVideoInput;
}>;


export type UpdateVideoMutation = { __typename?: 'Mutation', updateVideo: { __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, filename: string, duration?: number | null } | null } };


export const UpdateVideoDocument = gql`
    mutation UpdateVideo($input: UpdateVideoInput!) {
  updateVideo(input: $input) {
    ...AdminCoursePageEditVideo
  }
}
    ${AdminCoursePageEditVideoFragmentDoc}`;

export function useUpdateVideoMutation() {
  return Urql.useMutation<UpdateVideoMutation, UpdateVideoMutationVariables>(UpdateVideoDocument);
};