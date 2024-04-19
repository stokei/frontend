import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SitePageSiteFragmentDoc } from '../../../../contexts/site/graphql/site.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateSiteMutationVariables = Types.Exact<{
  input: Types.UpdateSiteInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', id: string, name: string, slug: string, stokeiDomain?: { __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null } | null, defaultDomain?: { __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null } | null, homePage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, loginPage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, signUpPage?: { __typename?: 'Page', id: string, slug: string, version?: { __typename?: 'Version', id: string } | null } | null, favicon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const UpdateSiteDocument = gql`
    mutation UpdateSite($input: UpdateSiteInput!) {
  updateSite(input: $input) {
    ...SitePageSite
  }
}
    ${SitePageSiteFragmentDoc}`;

export function useUpdateSiteMutation() {
  return Urql.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument);
};