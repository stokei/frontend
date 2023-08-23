import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodComponentFragmentDoc } from '../../../../components/payment-method/graphql/payment-method.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetOrderPageOrderQueryVariables = Types.Exact<{
  orderId: Types.Scalars['String'];
}>;


export type GetOrderPageOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, payments?: { __typename?: 'Payments', items?: Array<{ __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } | null } };

export type OrderPageOrderFragment = { __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, payments?: { __typename?: 'Payments', items?: Array<{ __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } | null };

export type OrderPagePaymentFragment = { __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export const OrderPagePaymentFragmentDoc = gql`
    fragment OrderPagePayment on Payment {
  id
  paymentMethod {
    ...PaymentMethodComponent
  }
  currency {
    id
    symbol
    minorUnit
  }
  status
  totalAmount
  subtotalAmount
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    ${PaymentMethodComponentFragmentDoc}`;
export const OrderPageOrderFragmentDoc = gql`
    fragment OrderPageOrder on Order {
  id
  currency {
    id
    symbol
    minorUnit
  }
  payments(orderBy: {createdAt: DESC}) {
    items {
      ...OrderPagePayment
    }
  }
  status
  totalAmount
  subtotalAmount
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    ${OrderPagePaymentFragmentDoc}`;
export const GetOrderPageOrderDocument = gql`
    query GetOrderPageOrder($orderId: String!) {
  order(id: $orderId) {
    ...OrderPageOrder
  }
}
    ${OrderPageOrderFragmentDoc}`;

export function useGetOrderPageOrderQuery(options: Omit<Urql.UseQueryArgs<GetOrderPageOrderQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrderPageOrderQuery, GetOrderPageOrderQueryVariables>({ query: GetOrderPageOrderDocument, ...options });
};