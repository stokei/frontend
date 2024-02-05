import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCouponPageCouponsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllCouponsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCouponsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetCouponPageCouponsQuery = { __typename?: 'Query', coupons: { __typename?: 'Coupons', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } };

export type CouponPageCouponFragment = { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null };

export const CouponPageCouponFragmentDoc = gql`
    fragment CouponPageCoupon on Coupon {
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
export const GetCouponPageCouponsDocument = gql`
    query GetCouponPageCoupons($where: WhereDataFindAllCouponsInput, $orderBy: OrderByDataFindAllCouponsInput, $page: PaginationInput) {
  coupons(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...CouponPageCoupon
    }
  }
}
    ${CouponPageCouponFragmentDoc}`;

export function useGetCouponPageCouponsQuery(options?: Omit<Urql.UseQueryArgs<GetCouponPageCouponsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCouponPageCouponsQuery, GetCouponPageCouponsQueryVariables>({ query: GetCouponPageCouponsDocument, ...options });
};