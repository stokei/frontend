import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodComponentFragmentDoc } from '../../../../components/payment-method/graphql/payment-method.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPaymentPagePaymentQueryVariables = Types.Exact<{
  paymentId: Types.Scalars['String'];
}>;


export type GetPaymentPagePaymentQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, status: Types.PaymentStatus, feeAmount: number, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, updatedAt?: string | null, createdAt?: string | null, payer?: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } } };

export type PaymentPagePaymentFragment = { __typename?: 'Payment', id: string, status: Types.PaymentStatus, feeAmount: number, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, updatedAt?: string | null, createdAt?: string | null, payer?: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export const PaymentPagePaymentFragmentDoc = gql`
    fragment PaymentPagePayment on Payment {
  id
  payer {
    id
    fullname
    email
    avatar {
      file {
        url
      }
    }
  }
  paymentMethod {
    ...PaymentMethodComponent
  }
  currency {
    id
    symbol
    minorUnit
  }
  status
  feeAmount
  totalAmount
  subtotalAmount
  paymentGatewayType
  paidAt
  canceledAt
  paymentErrorAt
  updatedAt
  createdAt
}
    ${PaymentMethodComponentFragmentDoc}`;
export const GetPaymentPagePaymentDocument = gql`
    query GetPaymentPagePayment($paymentId: String!) {
  payment(id: $paymentId) {
    ...PaymentPagePayment
  }
}
    ${PaymentPagePaymentFragmentDoc}`;

export function useGetPaymentPagePaymentQuery(options: Omit<Urql.UseQueryArgs<GetPaymentPagePaymentQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPaymentPagePaymentQuery, GetPaymentPagePaymentQueryVariables>({ query: GetPaymentPagePaymentDocument, ...options });
};