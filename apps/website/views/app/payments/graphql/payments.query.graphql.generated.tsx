import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodComponentFragmentDoc } from '../../../../components/payment-method/graphql/payment-method.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppPaymentsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPaymentsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllPaymentsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppPaymentsQuery = { __typename?: 'Query', payments: { __typename?: 'Payments', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, payer?: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } };

export type AppPaymentFragment = { __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, payer?: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export const AppPaymentFragmentDoc = gql`
    fragment AppPayment on Payment {
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
  totalAmount
  subtotalAmount
  paymentGatewayType
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    ${PaymentMethodComponentFragmentDoc}`;
export const GetAppPaymentsDocument = gql`
    query GetAppPayments($where: WhereDataFindAllPaymentsInput, $orderBy: OrderByDataFindAllPaymentsInput, $page: PaginationInput) {
  payments(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppPayment
    }
  }
}
    ${AppPaymentFragmentDoc}`;

export function useGetAppPaymentsQuery(options?: Omit<Urql.UseQueryArgs<GetAppPaymentsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppPaymentsQuery, GetAppPaymentsQueryVariables>({ query: GetAppPaymentsDocument, ...options });
};