import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodManagementPaymentMethodFragmentDoc } from './payment-methods.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PaymentMethodManagementCreatePaymentMethodMutationVariables = Types.Exact<{
  input: Types.CreatePaymentMethodInput;
}>;


export type PaymentMethodManagementCreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null } };


export const PaymentMethodManagementCreatePaymentMethodDocument = gql`
    mutation PaymentMethodManagementCreatePaymentMethod($input: CreatePaymentMethodInput!) {
  createPaymentMethod(input: $input) {
    ...PaymentMethodManagementPaymentMethod
  }
}
    ${PaymentMethodManagementPaymentMethodFragmentDoc}`;

export function usePaymentMethodManagementCreatePaymentMethodMutation() {
  return Urql.useMutation<PaymentMethodManagementCreatePaymentMethodMutation, PaymentMethodManagementCreatePaymentMethodMutationVariables>(PaymentMethodManagementCreatePaymentMethodDocument);
};