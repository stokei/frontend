import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CoursePageModuleFragment = { __typename?: 'Module', id: string, name: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, file?: { __typename?: 'File', url?: string | null, duration?: number | null, filename: string } | null }> | null } | null };

export type CoursePageModuleVideoFragment = { __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, file?: { __typename?: 'File', url?: string | null, duration?: number | null, filename: string } | null };

export const CoursePageModuleVideoFragmentDoc = gql`
    fragment CoursePageModuleVideo on Video {
  id
  name
  private
  active
  file {
    url
    duration
    filename
  }
}
    `;
export const CoursePageModuleFragmentDoc = gql`
    fragment CoursePageModule on Module {
  id
  name
  videos(orderBy: {createdAt: ASC}) {
    totalCount
    items {
      ...CoursePageModuleVideo
    }
  }
}
    ${CoursePageModuleVideoFragmentDoc}`;