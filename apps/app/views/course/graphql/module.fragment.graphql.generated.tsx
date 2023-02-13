import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CoursePageModuleFragment = { __typename?: 'Module', id: string, name: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null };

export const CoursePageModuleFragmentDoc = gql`
    fragment CoursePageModule on Module {
  id
  name
  videos(orderBy: {name: ASC}) {
    totalCount
    items {
      id
      name
      private
      active
      file {
        url
        duration
      }
    }
  }
}
    `;