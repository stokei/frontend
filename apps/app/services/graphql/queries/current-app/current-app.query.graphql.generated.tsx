import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentGlobalAppQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type CurrentGlobalAppQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, slug: string, homePage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, favicon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, app?: { __typename?: 'App', id: string, name: string, isStokei: boolean, isIntegratedWithPix: boolean, isIntegratedWithStripe: boolean, stripeAccount?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, icon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, colors?: { __typename?: 'Colors', items?: Array<{ __typename?: 'Color', color: string, themeMode: Types.ThemeMode, type: Types.ColorType }> | null } | null } | null } };


export const CurrentGlobalAppDocument = gql`
    query CurrentGlobalApp($slug: String!) {
  site(slug: $slug) {
    id
    name
    slug
    homePage {
      id
      slug
      version {
        id
      }
    }
    favicon {
      file {
        url
      }
    }
    logo {
      file {
        url
      }
    }
    app {
      id
      name
      isStokei
      isIntegratedWithPix
      isIntegratedWithStripe
      stripeAccount
      currency {
        id
        symbol
        minorUnit
      }
      icon {
        file {
          url
        }
      }
      logo {
        file {
          url
        }
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
}
    `;

export function useCurrentGlobalAppQuery(options: Omit<Urql.UseQueryArgs<CurrentGlobalAppQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentGlobalAppQuery, CurrentGlobalAppQueryVariables>({ query: CurrentGlobalAppDocument, ...options });
};