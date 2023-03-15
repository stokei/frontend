import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CheckoutPaymentMethodFragmentDoc } from './payment-methods.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreatePaymentMethodMutationVariables = Types.Exact<{
  input: Types.CreatePaymentMethodInput;
}>;


export type CreatePaymentMethodMutation = { __typename?: 'Mutation', createPaymentMethod: { __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null } };


export const CreatePaymentMethodDocument = gql`
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
  createPaymentMethod(input: $input) {
    ...CheckoutPaymentMethod
  }
}
    ${CheckoutPaymentMethodFragmentDoc}`;

export function useCreatePaymentMethodMutation() {
  return Urql.useMutation<CreatePaymentMethodMutation, CreatePaymentMethodMutationVariables>(CreatePaymentMethodDocument);
};