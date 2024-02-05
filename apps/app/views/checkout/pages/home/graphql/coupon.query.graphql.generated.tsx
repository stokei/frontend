import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutPageCouponQueryVariables = Types.Exact<{
  code?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetCheckoutPageCouponQuery = { __typename?: 'Query', coupon: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } };

export type CheckoutPageCouponFragment = { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null };

export const CheckoutPageCouponFragmentDoc = gql`
    fragment CheckoutPageCoupon on Coupon {
  id
  code
  active
  amountOff
  percentOff
  recipient {
    id
    fullname
    avatar {
      file {
        url
      }
    }
  }
}
    `;
export const GetCheckoutPageCouponDocument = gql`
    query GetCheckoutPageCoupon($code: String) {
  coupon(code: $code) {
    ...CheckoutPageCoupon
  }
}
    ${CheckoutPageCouponFragmentDoc}`;

export function useGetCheckoutPageCouponQuery(options?: Omit<Urql.UseQueryArgs<GetCheckoutPageCouponQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutPageCouponQuery, GetCheckoutPageCouponQueryVariables>({ query: GetCheckoutPageCouponDocument, ...options });
};