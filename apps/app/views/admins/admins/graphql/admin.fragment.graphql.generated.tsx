import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppAdminFragment = { __typename?: 'AppAdmin', id: string, admin: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export const AppAdminFragmentDoc = gql`
    fragment AppAdmin on AppAdmin {
  id
  admin {
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