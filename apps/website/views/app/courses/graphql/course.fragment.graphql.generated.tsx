import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppCourseFragment = { __typename?: 'Course', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } | null };

export const AppCourseFragmentDoc = gql`
    fragment AppCourse on Course {
  id
  name
  avatar {
    file {
      url
    }
  }
  instructors {
    totalCount
    items {
      id
      instructor {
        id
        firstname
        fullname
        avatar {
          file {
            url
          }
        }
      }
    }
  }
}
    `;