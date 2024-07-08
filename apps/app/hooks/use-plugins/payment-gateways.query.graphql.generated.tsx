import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPaymentGatewaysQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPaymentGatewaysQuery = { __typename?: 'Query', paymentGateways: Array<{ __typename?: 'PaymentGateway', type: Types.PaymentGatewayType, paymentMethods: Array<Types.PaymentMethodType> }> };

export type PaymentGatewaysPaymentGatewayFragment = { __typename?: 'PaymentGateway', type: Types.PaymentGatewayType, paymentMethods: Array<Types.PaymentMethodType> };

export const PaymentGatewaysPaymentGatewayFragmentDoc = gql`
    fragment PaymentGatewaysPaymentGateway on PaymentGateway {
  type
  paymentMethods
}
    `;
export const GetPaymentGatewaysDocument = gql`
    query GetPaymentGateways {
  paymentGateways {
    type
    paymentMethods
  }
}
    `;

export function useGetPaymentGatewaysQuery(options?: Omit<Urql.UseQueryArgs<GetPaymentGatewaysQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPaymentGatewaysQuery, GetPaymentGatewaysQueryVariables>({ query: GetPaymentGatewaysDocument, ...options });
};