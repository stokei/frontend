import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodManagementPaymentMethodCardFragmentDoc } from './payment-methods.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PaymentMethodManagementCreatePaymentMethodCardMutationVariables = Types.Exact<{
  input: Types.CreatePaymentMethodCardInput;
}>;


export type PaymentMethodManagementCreatePaymentMethodCardMutation = { __typename?: 'Mutation', createPaymentMethodCard: { __typename?: 'PaymentMethod', id: string, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } };


export const PaymentMethodManagementCreatePaymentMethodCardDocument = gql`
    mutation PaymentMethodManagementCreatePaymentMethodCard($input: CreatePaymentMethodCardInput!) {
  createPaymentMethodCard(input: $input) {
    ...PaymentMethodManagementPaymentMethodCard
  }
}
    ${PaymentMethodManagementPaymentMethodCardFragmentDoc}`;

export function usePaymentMethodManagementCreatePaymentMethodCardMutation() {
  return Urql.useMutation<PaymentMethodManagementCreatePaymentMethodCardMutation, PaymentMethodManagementCreatePaymentMethodCardMutationVariables>(PaymentMethodManagementCreatePaymentMethodCardDocument);
};