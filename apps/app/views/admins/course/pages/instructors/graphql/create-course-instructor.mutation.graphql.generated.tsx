import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCoursePageCourseInstructorFragmentDoc } from './course-instructors.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCourseInstructorMutationVariables = Types.Exact<{
  input: Types.CreateCourseInstructorInput;
}>;


export type CreateCourseInstructorMutation = { __typename?: 'Mutation', createCourseInstructor: { __typename?: 'CourseInstructor', instructor: { __typename?: 'Account', id: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } } };


export const CreateCourseInstructorDocument = gql`
    mutation CreateCourseInstructor($input: CreateCourseInstructorInput!) {
  createCourseInstructor(input: $input) {
    instructor {
      ...AdminCoursePageCourseInstructor
    }
  }
}
    ${AdminCoursePageCourseInstructorFragmentDoc}`;

export function useCreateCourseInstructorMutation() {
  return Urql.useMutation<CreateCourseInstructorMutation, CreateCourseInstructorMutationVariables>(CreateCourseInstructorDocument);
};