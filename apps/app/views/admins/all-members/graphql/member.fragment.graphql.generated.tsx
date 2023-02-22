import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppMemberFragment = { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppMemberFragmentDoc = gql`
    fragment AppMember on Account {
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
    `;