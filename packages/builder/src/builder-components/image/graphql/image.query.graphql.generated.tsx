import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetBuilderComponentImageQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetBuilderComponentImageQuery = { __typename?: 'Query', image: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } };

export type BuilderComponentImageFragment = { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } };

export const BuilderComponentImageFragmentDoc = gql`
    fragment BuilderComponentImage on Image {
  id
  file {
    url
  }
}
    `;
export const GetBuilderComponentImageDocument = gql`
    query GetBuilderComponentImage($id: String!) {
  image(id: $id) {
    ...BuilderComponentImage
  }
}
    ${BuilderComponentImageFragmentDoc}`;

export function useGetBuilderComponentImageQuery(options: Omit<Urql.UseQueryArgs<GetBuilderComponentImageQueryVariables>, 'query'>) {
  return Urql.useQuery<GetBuilderComponentImageQuery, GetBuilderComponentImageQueryVariables>({ query: GetBuilderComponentImageDocument, ...options });
};