import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminSettingsCoursePageCourseFragmentDoc } from './course.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AdminSettingsCoursePageUpdateCourseMutationVariables = Types.Exact<{
  input: Types.UpdateCourseInput;
}>;


export type AdminSettingsCoursePageUpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };


export const AdminSettingsCoursePageUpdateCourseDocument = gql`
    mutation AdminSettingsCoursePageUpdateCourse($input: UpdateCourseInput!) {
  updateCourse(input: $input) {
    ...AdminSettingsCoursePageCourse
  }
}
    ${AdminSettingsCoursePageCourseFragmentDoc}`;

export function useAdminSettingsCoursePageUpdateCourseMutation() {
  return Urql.useMutation<AdminSettingsCoursePageUpdateCourseMutation, AdminSettingsCoursePageUpdateCourseMutationVariables>(AdminSettingsCoursePageUpdateCourseDocument);
};