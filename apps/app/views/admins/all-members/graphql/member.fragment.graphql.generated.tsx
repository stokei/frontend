import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppMemberFragment = { __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, email: string, username: string, status: Types.AccountStatus, createdAt?: string | null, isStokei: boolean, isAdmin?: boolean | null, isOwner?: boolean | null, isInstructor?: boolean | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppMemberFragmentDoc = gql`
    fragment AppMember on Account {
  id
  firstname
  lastname
  fullname
  email
  username
  status
  createdAt
  isStokei
  isAdmin
  isOwner
  isInstructor
  avatar {
    file {
      url
    }
  }
}
    `;