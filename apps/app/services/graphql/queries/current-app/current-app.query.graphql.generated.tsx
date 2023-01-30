import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentGlobalAppQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentGlobalAppQuery = { __typename?: 'Query', currentApp: { __typename?: 'App', id: string, name: string, logo?: { __typename?: 'Image', url: string } | null, colors?: { __typename?: 'Colors', items?: Array<{ __typename?: 'Color', color: string, themeMode: Types.ThemeMode, type: Types.ColorType }> | null } | null } };


export const CurrentGlobalAppDocument = gql`
    query CurrentGlobalApp {
  currentApp {
    id
    name
    logo {
      url
    }
    colors {
      items {
        color
        themeMode
        type
      }
    }
  }
}
    `;

export function useCurrentGlobalAppQuery(options?: Omit<Urql.UseQueryArgs<CurrentGlobalAppQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentGlobalAppQuery, CurrentGlobalAppQueryVariables>({ query: CurrentGlobalAppDocument, ...options });
};