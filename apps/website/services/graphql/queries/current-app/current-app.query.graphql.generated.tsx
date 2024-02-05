import * as Types from '../../stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CurrentGlobalAppQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentGlobalAppQuery = { __typename?: 'Query', currentApp: { __typename?: 'App', id: string, name: string, slug: string, isStokei: boolean, isIntegratedWithPagarme: boolean, stripeAccount?: string | null, status: Types.AppStatus, currentSubscriptionContract?: { __typename?: 'SubscriptionContract', id: string } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, icon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, colors?: { __typename?: 'Colors', items?: Array<{ __typename?: 'Color', color: string, themeMode: Types.ThemeMode, type: Types.ColorType }> | null } | null } };


export const CurrentGlobalAppDocument = gql`
    query CurrentGlobalApp {
  currentApp {
    id
    name
    slug
    isStokei
    isIntegratedWithPagarme
    stripeAccount
    status
    currentSubscriptionContract {
      id
    }
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
    `;

export function useCurrentGlobalAppQuery(options?: Omit<Urql.UseQueryArgs<CurrentGlobalAppQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrentGlobalAppQuery, CurrentGlobalAppQueryVariables>({ query: CurrentGlobalAppDocument, ...options });
};