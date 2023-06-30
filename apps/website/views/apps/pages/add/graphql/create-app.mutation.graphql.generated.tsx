import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type CreateAppMutation = { __typename?: 'Mutation', createApp: { __typename?: 'App', id: string } };


export const CreateAppDocument = gql`
    mutation CreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    id
  }
}
    `;

export function useCreateAppMutation() {
  return Urql.useMutation<CreateAppMutation, CreateAppMutationVariables>(CreateAppDocument);
};