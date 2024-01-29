import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PaymentMethodManagementPaymentMethodsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPaymentMethodsInput>;
}>;


export type PaymentMethodManagementPaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethods', items?: Array<{ __typename?: 'PaymentMethod', id: string, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null }> | null } };

export type PaymentMethodManagementPaymentMethodCardFragment = { __typename?: 'PaymentMethod', id: string, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null };

export const PaymentMethodManagementPaymentMethodCardFragmentDoc = gql`
    fragment PaymentMethodManagementPaymentMethodCard on PaymentMethod {
  id
  parent
  referenceId
  cardBrand
  cardExpiryMonth
  cardExpiryYear
  lastFourCardNumber
}
    `;
export const PaymentMethodManagementPaymentMethodsDocument = gql`
    query PaymentMethodManagementPaymentMethods($where: WhereDataFindAllPaymentMethodsInput) {
  paymentMethods(where: $where) {
    items {
      ...PaymentMethodManagementPaymentMethodCard
    }
  }
}
    ${PaymentMethodManagementPaymentMethodCardFragmentDoc}`;

export function usePaymentMethodManagementPaymentMethodsQuery(options?: Omit<Urql.UseQueryArgs<PaymentMethodManagementPaymentMethodsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentMethodManagementPaymentMethodsQuery, PaymentMethodManagementPaymentMethodsQueryVariables>({ query: PaymentMethodManagementPaymentMethodsDocument, ...options });
};