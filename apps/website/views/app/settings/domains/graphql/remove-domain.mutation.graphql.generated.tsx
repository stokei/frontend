import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppDomainFragmentDoc } from './domains.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveDomainMutationVariables = Types.Exact<{
  input: Types.RemoveDomainInput;
}>;


export type RemoveDomainMutation = { __typename?: 'Mutation', removeDomain: { __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null } };


export const RemoveDomainDocument = gql`
    mutation RemoveDomain($input: RemoveDomainInput!) {
  removeDomain(input: $input) {
    ...AppDomain
  }
}
    ${AppDomainFragmentDoc}`;

export function useRemoveDomainMutation() {
  return Urql.useMutation<RemoveDomainMutation, RemoveDomainMutationVariables>(RemoveDomainDocument);
};