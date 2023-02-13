import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CheckoutProductCourseFragment = { __typename?: 'Course', id: string, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export const CheckoutProductCourseFragmentDoc = gql`
    fragment CheckoutProductCourse on Course {
  id
  instructors {
    totalCount
    items {
      id
      instructor {
        fullname
      }
    }
  }
}
    `;