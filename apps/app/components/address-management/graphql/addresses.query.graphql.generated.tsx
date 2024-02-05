import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AddressManagementAddresssQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAddressesInput>;
}>;


export type AddressManagementAddresssQuery = { __typename?: 'Query', addresses: { __typename?: 'Addresses', items?: Array<{ __typename?: 'Address', id: string, street: string, complement?: string | null, number: string, city: string, country: string, state: string, postalCode: string }> | null } };

export type AddressManagementAddressFragment = { __typename?: 'Address', id: string, street: string, complement?: string | null, number: string, city: string, country: string, state: string, postalCode: string };

export const AddressManagementAddressFragmentDoc = gql`
    fragment AddressManagementAddress on Address {
  id
  street
  complement
  number
  city
  country
  state
  postalCode
}
    `;
export const AddressManagementAddresssDocument = gql`
    query AddressManagementAddresss($where: WhereDataFindAllAddressesInput) {
  addresses(where: $where) {
    items {
      ...AddressManagementAddress
    }
  }
}
    ${AddressManagementAddressFragmentDoc}`;

export function useAddressManagementAddresssQuery(options?: Omit<Urql.UseQueryArgs<AddressManagementAddresssQueryVariables>, 'query'>) {
  return Urql.useQuery<AddressManagementAddresssQuery, AddressManagementAddresssQueryVariables>({ query: AddressManagementAddresssDocument, ...options });
};