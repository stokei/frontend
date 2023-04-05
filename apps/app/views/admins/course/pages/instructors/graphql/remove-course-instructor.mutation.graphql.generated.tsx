import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageCourseInstructorFragmentDoc } from './course-instructors.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveCourseInstructorMutationVariables = Types.Exact<{
  input: Types.RemoveCourseInstructorInput;
}>;


export type RemoveCourseInstructorMutation = { __typename?: 'Mutation', removeCourseInstructor: { __typename?: 'CourseInstructor', instructor: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } } };


export const RemoveCourseInstructorDocument = gql`
    mutation RemoveCourseInstructor($input: RemoveCourseInstructorInput!) {
  removeCourseInstructor(input: $input) {
    instructor {
      ...AdminCoursePageCourseInstructor
    }
  }
}
    ${AdminCoursePageCourseInstructorFragmentDoc}`;

export function useRemoveCourseInstructorMutation() {
  return Urql.useMutation<RemoveCourseInstructorMutation, RemoveCourseInstructorMutationVariables>(RemoveCourseInstructorDocument);
};