import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCustomersCoursePageVideoQueryVariables = Types.Exact<{
  videoId: Types.Scalars['String'];
}>;


export type GetCustomersCoursePageVideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null } };

export type CustomersCoursePageVideoFragment = { __typename?: 'Video', id: string, name: string, description?: string | null, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null };

export const CustomersCoursePageVideoFragmentDoc = gql`
    fragment CustomersCoursePageVideo on Video {
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
    duration
  }
}
    `;
export const GetCustomersCoursePageVideoDocument = gql`
    query GetCustomersCoursePageVideo($videoId: String!) {
  video(id: $videoId) {
    ...CustomersCoursePageVideo
  }
}
    ${CustomersCoursePageVideoFragmentDoc}`;

export function useGetCustomersCoursePageVideoQuery(options: Omit<Urql.UseQueryArgs<GetCustomersCoursePageVideoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCustomersCoursePageVideoQuery, GetCustomersCoursePageVideoQueryVariables>({ query: GetCustomersCoursePageVideoDocument, ...options });
};