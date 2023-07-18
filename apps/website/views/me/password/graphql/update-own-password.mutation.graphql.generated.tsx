import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateOwnPasswordMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateOwnPasswordMutation = { __typename?: 'Mutation', updateOwnPassword: boolean };


export const UpdateOwnPasswordDocument = gql`
    mutation UpdateOwnPassword {
  updateOwnPassword
}
    `;

export function useUpdateOwnPasswordMutation() {
  return Urql.useMutation<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>(UpdateOwnPasswordDocument);
};