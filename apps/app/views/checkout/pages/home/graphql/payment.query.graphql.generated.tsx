import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutPageOrderQueryVariables = Types.Exact<{
  orderId: Types.Scalars['String'];
}>;


export type GetCheckoutPageOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, status: Types.OrderStatus } };

export type CheckoutPageOrderFragment = { __typename?: 'Order', id: string, status: Types.OrderStatus };

export const CheckoutPageOrderFragmentDoc = gql`
    fragment CheckoutPageOrder on Order {
  id
  status
}
    `;
export const GetCheckoutPageOrderDocument = gql`
    query GetCheckoutPageOrder($orderId: String!) {
  order(id: $orderId) {
    ...CheckoutPageOrder
  }
}
    ${CheckoutPageOrderFragmentDoc}`;

export function useGetCheckoutPageOrderQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutPageOrderQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutPageOrderQuery, GetCheckoutPageOrderQueryVariables>({ query: GetCheckoutPageOrderDocument, ...options });
};