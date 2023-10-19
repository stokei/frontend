import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCoursePageEditVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['String'];
}>;


export type GetAdminCoursePageEditVideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, filename: string, duration?: number | null } | null } };

export type AdminCoursePageEditVideoFragment = { __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, filename: string, duration?: number | null } | null };

export const AdminCoursePageEditVideoFragmentDoc = gql`
    fragment AdminCoursePageEditVideo on Video {
  id
  name
  description
  private
  active
  parent
  authors {
    totalCount
    items {
      author {
        id
        fullname
        avatar {
          file {
            url
          }
        }
      }
    }
  }
  poster {
    id
    file {
      url
    }
  }
  file {
    url
    filename
    duration
  }
}
    `;
export const GetAdminCoursePageEditVideoDocument = gql`
    query GetAdminCoursePageEditVideo($videoId: String!) {
  video(id: $videoId) {
    ...AdminCoursePageEditVideo
  }
}
    ${AdminCoursePageEditVideoFragmentDoc}`;

export function useGetAdminCoursePageEditVideoQuery(options: Omit<Urql.UseQueryArgs<GetAdminCoursePageEditVideoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCoursePageEditVideoQuery, GetAdminCoursePageEditVideoQueryVariables>({ query: GetAdminCoursePageEditVideoDocument, ...options });
};