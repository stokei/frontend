import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppDomainFragmentDoc } from './domains.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateDomainMutationVariables = Types.Exact<{
  input: Types.CreateDomainInput;
}>;


export type CreateDomainMutation = { __typename?: 'Mutation', createDomain: { __typename?: 'Domain', id: string, name: string, url?: string | null, free: boolean, active: boolean, status: Types.DomainStatus, createdAt?: string | null, activatedAt?: string | null } };


export const CreateDomainDocument = gql`
    mutation CreateDomain($input: CreateDomainInput!) {
  createDomain(input: $input) {
    ...AppDomain
  }
}
    ${AppDomainFragmentDoc}`;

export function useCreateDomainMutation() {
  return Urql.useMutation<CreateDomainMutation, CreateDomainMutationVariables>(CreateDomainDocument);
};