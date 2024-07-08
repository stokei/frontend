import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutPaymentGatewaysQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCheckoutPaymentGatewaysQuery = { __typename?: 'Query', paymentGateways: Array<{ __typename?: 'PaymentGateway', type: Types.PaymentGatewayType, paymentMethods: Array<Types.PaymentMethodType> }> };

export type CheckoutPaymentGatewayFragment = { __typename?: 'PaymentGateway', type: Types.PaymentGatewayType, paymentMethods: Array<Types.PaymentMethodType> };

export const CheckoutPaymentGatewayFragmentDoc = gql`
    fragment CheckoutPaymentGateway on PaymentGateway {
  type
  paymentMethods
}
    `;
export const GetCheckoutPaymentGatewaysDocument = gql`
    query GetCheckoutPaymentGateways {
  paymentGateways {
    ...CheckoutPaymentGateway
  }
}
    ${CheckoutPaymentGatewayFragmentDoc}`;

export function useGetCheckoutPaymentGatewaysQuery(options?: Omit<Urql.UseQueryArgs<GetCheckoutPaymentGatewaysQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutPaymentGatewaysQuery, GetCheckoutPaymentGatewaysQueryVariables>({ query: GetCheckoutPaymentGatewaysDocument, ...options });
};