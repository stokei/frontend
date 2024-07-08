import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SubscriptionPageSubscriptionContractFragmentDoc } from './subscription-contract.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CancelSubscriptionContractMutationVariables = Types.Exact<{
  input: Types.CancelSubscriptionContractInput;
}>;


export type CancelSubscriptionContractMutation = { __typename?: 'Mutation', cancelSubscriptionContract: { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null } };


export const CancelSubscriptionContractDocument = gql`
    mutation CancelSubscriptionContract($input: CancelSubscriptionContractInput!) {
  cancelSubscriptionContract(input: $input) {
    ...SubscriptionPageSubscriptionContract
  }
}
    ${SubscriptionPageSubscriptionContractFragmentDoc}`;

export function useCancelSubscriptionContractMutation() {
  return Urql.useMutation<CancelSubscriptionContractMutation, CancelSubscriptionContractMutationVariables>(CancelSubscriptionContractDocument);
};