import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAppStripeOnboardingMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateAppStripeOnboardingMutation = { __typename?: 'Mutation', createAppStripeOnboarding: { __typename?: 'Link', url: string } };


export const CreateAppStripeOnboardingDocument = gql`
    mutation CreateAppStripeOnboarding {
  createAppStripeOnboarding {
    url
  }
}
    `;

export function useCreateAppStripeOnboardingMutation() {
  return Urql.useMutation<CreateAppStripeOnboardingMutation, CreateAppStripeOnboardingMutationVariables>(CreateAppStripeOnboardingDocument);
};