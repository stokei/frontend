import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageModuleFragmentDoc } from './modules.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveModuleMutationVariables = Types.Exact<{
  input: Types.RemoveModuleInput;
}>;


export type RemoveModuleMutation = { __typename?: 'Mutation', removeModule: { __typename?: 'Module', id: string, name: string, parent: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, parent?: string | null, authors: { __typename?: 'VideoAuthors', totalCount: number, items?: Array<{ __typename?: 'VideoAuthor', author: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null }, poster?: { __typename?: 'Image', id: string, file: { __typename?: 'File', url?: string | null } } | null, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null } };


export const RemoveModuleDocument = gql`
    mutation RemoveModule($input: RemoveModuleInput!) {
  removeModule(input: $input) {
    ...AdminCoursePageModule
  }
}
    ${AdminCoursePageModuleFragmentDoc}`;

export function useRemoveModuleMutation() {
  return Urql.useMutation<RemoveModuleMutation, RemoveModuleMutationVariables>(RemoveModuleDocument);
};