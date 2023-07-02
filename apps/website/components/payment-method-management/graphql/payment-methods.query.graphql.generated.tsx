import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PaymentMethodManagementPaymentMethodsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPaymentMethodsInput>;
}>;


export type PaymentMethodManagementPaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethods', items?: Array<{ __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null }> | null } };

export type PaymentMethodManagementPaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null };

export const PaymentMethodManagementPaymentMethodFragmentDoc = gql`
    fragment PaymentMethodManagementPaymentMethod on PaymentMethod {
  id
  parent
  cardBrand
  cardExpiryMonth
  cardExpiryYear
  lastFourCardNumber
  stripePaymentMethod
}
    `;
export const PaymentMethodManagementPaymentMethodsDocument = gql`
    query PaymentMethodManagementPaymentMethods($where: WhereDataFindAllPaymentMethodsInput) {
  paymentMethods(where: $where) {
    items {
      ...PaymentMethodManagementPaymentMethod
    }
  }
}
    ${PaymentMethodManagementPaymentMethodFragmentDoc}`;

export function usePaymentMethodManagementPaymentMethodsQuery(options?: Omit<Urql.UseQueryArgs<PaymentMethodManagementPaymentMethodsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentMethodManagementPaymentMethodsQuery, PaymentMethodManagementPaymentMethodsQueryVariables>({ query: PaymentMethodManagementPaymentMethodsDocument, ...options });
};