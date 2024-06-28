import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAppPaymentOnboardingLinkMutationVariables = Types.Exact<{
  input: Types.CreateAppPaymentOnboardingLinkInput;
}>;


export type CreateAppPaymentOnboardingLinkMutation = { __typename?: 'Mutation', createAppPaymentOnboardingLink: { __typename?: 'Link', url: string } };


export const CreateAppPaymentOnboardingLinkDocument = gql`
    mutation CreateAppPaymentOnboardingLink($input: CreateAppPaymentOnboardingLinkInput!) {
  createAppPaymentOnboardingLink(input: $input) {
    url
  }
}
    `;

export function useCreateAppPaymentOnboardingLinkMutation() {
  return Urql.useMutation<CreateAppPaymentOnboardingLinkMutation, CreateAppPaymentOnboardingLinkMutationVariables>(CreateAppPaymentOnboardingLinkDocument);
};