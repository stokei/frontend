import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCheckoutMutationVariables = Types.Exact<{
  input: Types.CreateCheckoutInput;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', createCheckout: { __typename?: 'Checkout', url?: string | null, payment?: { __typename?: 'Payment', id: string } | null, pix?: { __typename?: 'CheckoutPix', copyAndPaste: string, qrCodeURL: string } | null } };


export const CreateCheckoutDocument = gql`
    mutation CreateCheckout($input: CreateCheckoutInput!) {
  createCheckout(input: $input) {
    url
    payment {
      id
    }
    pix {
      copyAndPaste
      qrCodeURL
    }
  }
}
    `;

export function useCreateCheckoutMutation() {
  return Urql.useMutation<CreateCheckoutMutation, CreateCheckoutMutationVariables>(CreateCheckoutDocument);
};