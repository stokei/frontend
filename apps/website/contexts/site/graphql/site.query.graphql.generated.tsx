import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSitePageSiteQueryVariables = Types.Exact<{
  site: Types.Scalars['String'];
}>;


export type GetSitePageSiteQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, name: string, slug: string, homePage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, favicon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export type SitePageSiteFragment = { __typename?: 'Site', id: string, name: string, slug: string, homePage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, favicon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SitePageSiteFragmentDoc = gql`
    fragment SitePageSite on Site {
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
}
    `;
export const GetSitePageSiteDocument = gql`
    query GetSitePageSite($site: String!) {
  site(id: $site) {
    ...SitePageSite
  }
}
    ${SitePageSiteFragmentDoc}`;

export function useGetSitePageSiteQuery(options: Omit<Urql.UseQueryArgs<GetSitePageSiteQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSitePageSiteQuery, GetSitePageSiteQueryVariables>({ query: GetSitePageSiteDocument, ...options });
};