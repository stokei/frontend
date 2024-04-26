import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateOrUpdateColorMutationVariables = Types.Exact<{
  input: Types.CreateOrUpdateColorInput;
}>;


export type CreateOrUpdateColorMutation = { __typename?: 'Mutation', createOrUpdateColor: { __typename?: 'Color', id: string } };


export const CreateOrUpdateColorDocument = gql`
    mutation CreateOrUpdateColor($input: CreateOrUpdateColorInput!) {
  createOrUpdateColor(input: $input) {
    id
  }
}
    `;

export function useCreateOrUpdateColorMutation() {
  return Urql.useMutation<CreateOrUpdateColorMutation, CreateOrUpdateColorMutationVariables>(CreateOrUpdateColorDocument);
};