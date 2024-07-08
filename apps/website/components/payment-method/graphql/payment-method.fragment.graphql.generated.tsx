import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type PaymentMethodComponentFragment = { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null };

export const PaymentMethodComponentFragmentDoc = gql`
    fragment PaymentMethodComponent on PaymentMethod {
  id
  type
  parent
  referenceId
  cardBrand
  cardExpiryMonth
  cardExpiryYear
  lastFourCardNumber
}
    `;