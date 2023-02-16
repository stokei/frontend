import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CheckoutPaymentMethodFragment = { __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null };

export const CheckoutPaymentMethodFragmentDoc = gql`
    fragment CheckoutPaymentMethod on PaymentMethod {
  id
  parent
  cardBrand
  cardExpiryMonth
  cardExpiryYear
  lastFourCardNumber
  stripePaymentMethod
}
    `;