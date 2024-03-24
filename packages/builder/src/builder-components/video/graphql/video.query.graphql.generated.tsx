import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBuilderComponentVideoQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetBuilderComponentVideoQuery = { __typename?: 'Query', video: { __typename?: 'Video', id: string, poster?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', filename: string, url?: string | null } | null } };

export type BuilderComponentVideoFragment = { __typename?: 'Video', id: string, poster?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', filename: string, url?: string | null } | null };

export const BuilderComponentVideoFragmentDoc = gql`
    fragment BuilderComponentVideo on Video {
  id
  poster {
    file {
      url
    }
  }
  file {
    filename
    url
  }
}
    `;
export const GetBuilderComponentVideoDocument = gql`
    query GetBuilderComponentVideo($id: String!) {
  video(id: $id) {
    ...BuilderComponentVideo
  }
}
    ${BuilderComponentVideoFragmentDoc}`;

export function useGetBuilderComponentVideoQuery(options: Omit<Urql.UseQueryArgs<GetBuilderComponentVideoQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBuilderComponentVideoQuery, GetBuilderComponentVideoQueryVariables>({ query: GetBuilderComponentVideoDocument, ...options });
};