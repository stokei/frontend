import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageModuleFragmentDoc } from './modules.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateModuleMutationVariables = Types.Exact<{
  input: Types.CreateModuleInput;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'Module', id: string, name: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null } };


export const CreateModuleDocument = gql`
    mutation CreateModule($input: CreateModuleInput!) {
  createModule(input: $input) {
    ...AdminCoursePageModule
  }
}
    ${AdminCoursePageModuleFragmentDoc}`;

export function useCreateModuleMutation() {
  return Urql.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument);
};