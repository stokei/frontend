import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodComponentFragmentDoc } from '../../payment-method/graphql/payment-method.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PaymentMethodManagementPaymentMethodsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPaymentMethodsInput>;
}>;


export type PaymentMethodManagementPaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethods', items?: Array<{ __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null }> | null } };


export const PaymentMethodManagementPaymentMethodsDocument = gql`
    query PaymentMethodManagementPaymentMethods($where: WhereDataFindAllPaymentMethodsInput) {
  paymentMethods(where: $where) {
    items {
      ...PaymentMethodComponent
    }
  }
}
    ${PaymentMethodComponentFragmentDoc}`;

export function usePaymentMethodManagementPaymentMethodsQuery(options?: Omit<Urql.UseQueryArgs<PaymentMethodManagementPaymentMethodsQueryVariables>, 'query'>) {
  return Urql.useQuery<PaymentMethodManagementPaymentMethodsQuery, PaymentMethodManagementPaymentMethodsQueryVariables>({ query: PaymentMethodManagementPaymentMethodsDocument, ...options });
};