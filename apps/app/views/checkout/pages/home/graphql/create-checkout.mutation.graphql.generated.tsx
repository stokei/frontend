import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCheckoutMutationVariables = Types.Exact<{
  input: Types.CreateCheckoutInput;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', createCheckout: { __typename?: 'Checkout', url?: string | null, payment: { __typename?: 'Payment', id: string }, boleto?: { __typename?: 'CheckoutBoleto', barcode: string, line: string, pdf: string } | null, card?: { __typename?: 'CheckoutCard', brand: string, expiryYear: string, expiryMonth: string, lastFourNumber: string } | null, pix?: { __typename?: 'CheckoutPix', copyAndPaste: string, qrCodeURL: string } | null } };

export type CreateCheckoutPageCheckoutFragment = { __typename?: 'Checkout', url?: string | null, payment: { __typename?: 'Payment', id: string }, boleto?: { __typename?: 'CheckoutBoleto', barcode: string, line: string, pdf: string } | null, card?: { __typename?: 'CheckoutCard', brand: string, expiryYear: string, expiryMonth: string, lastFourNumber: string } | null, pix?: { __typename?: 'CheckoutPix', copyAndPaste: string, qrCodeURL: string } | null };

export const CreateCheckoutPageCheckoutFragmentDoc = gql`
    fragment CreateCheckoutPageCheckout on Checkout {
  payment {
    id
  }
  url
  boleto {
    barcode
    line
    pdf
  }
  card {
    brand
    expiryYear
    expiryMonth
    lastFourNumber
  }
  pix {
    copyAndPaste
    qrCodeURL
  }
}
    `;
export const CreateCheckoutDocument = gql`
    mutation CreateCheckout($input: CreateCheckoutInput!) {
  createCheckout(input: $input) {
    ...CreateCheckoutPageCheckout
  }
}
    ${CreateCheckoutPageCheckoutFragmentDoc}`;

export function useCreateCheckoutMutation() {
  return Urql.useMutation<CreateCheckoutMutation, CreateCheckoutMutationVariables>(CreateCheckoutDocument);
};