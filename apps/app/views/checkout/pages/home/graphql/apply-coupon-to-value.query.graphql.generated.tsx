import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutPageApplyCouponToValueQueryVariables = Types.Exact<{
  input: Types.ApplyCouponToValueInput;
}>;


export type GetCheckoutPageApplyCouponToValueQuery = { __typename?: 'Query', applyCouponToValue: { __typename?: 'ApplyCouponToValue', totalAmount: number, subtotalAmount: number, discountAmount: number } };

export type CheckoutPageApplyCouponToValueFragment = { __typename?: 'ApplyCouponToValue', totalAmount: number, subtotalAmount: number, discountAmount: number };

export const CheckoutPageApplyCouponToValueFragmentDoc = gql`
    fragment CheckoutPageApplyCouponToValue on ApplyCouponToValue {
  totalAmount
  subtotalAmount
  discountAmount
}
    `;
export const GetCheckoutPageApplyCouponToValueDocument = gql`
    query GetCheckoutPageApplyCouponToValue($input: ApplyCouponToValueInput!) {
  applyCouponToValue(input: $input) {
    ...CheckoutPageApplyCouponToValue
  }
}
    ${CheckoutPageApplyCouponToValueFragmentDoc}`;

export function useGetCheckoutPageApplyCouponToValueQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutPageApplyCouponToValueQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutPageApplyCouponToValueQuery, GetCheckoutPageApplyCouponToValueQueryVariables>({ query: GetCheckoutPageApplyCouponToValueDocument, ...options });
};