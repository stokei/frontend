import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentAppQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentAppQuery = { __typename?: 'Query', currentApp: { __typename?: 'App', hero?: { __typename?: 'Hero', id: string, title?: string | null, titleHighlight?: string | null, subtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } };


export const CurrentAppDocument = gql`
    query CurrentApp {
  currentApp {
    hero {
      id
      title
      titleHighlight
      subtitle
      video {
        file {
          url
        }
      }
      image {
        file {
          url
        }
      }
      backgroundImage {
        file {
          url
        }
      }
    }
  }
}
    `;

export function useCurrentAppQuery(options?: Omit<Urql.UseQueryArgs<CurrentAppQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentAppQuery, CurrentAppQueryVariables>({ query: CurrentAppDocument, ...options });
};