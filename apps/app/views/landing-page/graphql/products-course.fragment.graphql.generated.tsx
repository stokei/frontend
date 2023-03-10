import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type LandingPageProductsCourseFragment = { __typename?: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export const LandingPageProductsCourseFragmentDoc = gql`
    fragment LandingPageProductsCourse on Course {
  instructors {
    items {
      id
      instructor {
        fullname
      }
    }
  }
}
    `;