import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CoursePageModuleFragment = { __typename?: 'Module', id: string, name: string, videos?: { __typename?: 'Videos', items?: Array<{ __typename?: 'Video', id: string, name: string }> | null } | null };

export const CoursePageModuleFragmentDoc = gql`
    fragment CoursePageModule on Module {
  id
  name
  videos {
    items {
      id
      name
    }
  }
}
    `;