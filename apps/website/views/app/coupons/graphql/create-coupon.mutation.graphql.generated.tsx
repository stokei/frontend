import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CouponPageCouponFragmentDoc } from './coupons.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCouponMutationVariables = Types.Exact<{
  input: Types.CreateCouponInput;
}>;


export type CreateCouponMutation = { __typename?: 'Mutation', createCoupon: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } };


export const CreateCouponDocument = gql`
    mutation CreateCoupon($input: CreateCouponInput!) {
  createCoupon(input: $input) {
    ...CouponPageCoupon
  }
}
    ${CouponPageCouponFragmentDoc}`;

export function useCreateCouponMutation() {
  return Urql.useMutation<CreateCouponMutation, CreateCouponMutationVariables>(CreateCouponDocument);
};