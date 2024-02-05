import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AddressManagementAddressFragmentDoc } from './addresses.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddressManagementCreateAddressMutationVariables = Types.Exact<{
  input: Types.CreateAddressInput;
}>;


export type AddressManagementCreateAddressMutation = { __typename?: 'Mutation', createAddress: { __typename?: 'Address', id: string, street: string, complement?: string | null, number: string, city: string, country: string, state: string, postalCode: string } };


export const AddressManagementCreateAddressDocument = gql`
    mutation AddressManagementCreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    ...AddressManagementAddress
  }
}
    ${AddressManagementAddressFragmentDoc}`;

export function useAddressManagementCreateAddressMutation() {
  return Urql.useMutation<AddressManagementCreateAddressMutation, AddressManagementCreateAddressMutationVariables>(AddressManagementCreateAddressDocument);
};