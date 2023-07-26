import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CourseMaterialFragmentDoc } from '../../materials/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveCourseMaterialMutationVariables = Types.Exact<{
  input: Types.RemoveMaterialInput;
}>;


export type RemoveCourseMaterialMutation = { __typename?: 'Mutation', removeMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const RemoveCourseMaterialDocument = gql`
    mutation RemoveCourseMaterial($input: RemoveMaterialInput!) {
  removeMaterial(input: $input) {
    ...CourseMaterial
  }
}
    ${CourseMaterialFragmentDoc}`;

export function useRemoveCourseMaterialMutation() {
  return Urql.useMutation<RemoveCourseMaterialMutation, RemoveCourseMaterialMutationVariables>(RemoveCourseMaterialDocument);
};