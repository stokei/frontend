import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CourseMaterialFragmentDoc } from '../../materials/graphql/materials.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCourseMaterialMutationVariables = Types.Exact<{
  input: Types.CreateMaterialInput;
}>;


export type CreateCourseMaterialMutation = { __typename?: 'Mutation', createMaterial: { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const CreateCourseMaterialDocument = gql`
    mutation CreateCourseMaterial($input: CreateMaterialInput!) {
  createMaterial(input: $input) {
    ...CourseMaterial
  }
}
    ${CourseMaterialFragmentDoc}`;

export function useCreateCourseMaterialMutation() {
  return Urql.useMutation<CreateCourseMaterialMutation, CreateCourseMaterialMutationVariables>(CreateCourseMaterialDocument);
};