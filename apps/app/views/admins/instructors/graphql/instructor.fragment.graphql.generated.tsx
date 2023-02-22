import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppInstructorFragment = { __typename?: 'AppInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export const AppInstructorFragmentDoc = gql`
    fragment AppInstructor on AppInstructor {
  id
  instructor {
    id
    firstname
    fullname
    email
    avatar {
      file {
        url
      }
    }
  }
}
    `;