import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MemberPageGetMemberQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type MemberPageGetMemberQuery = { __typename?: 'Query', account: { __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, isOwner?: boolean | null, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } } };

export type MemberPageMemberFragment = { __typename?: 'Account', id: string, firstname: string, lastname: string, fullname: string, isOwner?: boolean | null, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, roles?: { __typename?: 'Roles', totalCount: number, items?: Array<{ __typename?: 'Role', name: string }> | null } | null, app: { __typename?: 'App', id: string, name: string } };

export const MemberPageMemberFragmentDoc = gql`
    fragment MemberPageMember on Account {
  id
  firstname
  lastname
  fullname
  avatar {
    file {
      url
    }
  }
  isOwner
  roles {
    totalCount
    items {
      name
    }
  }
  app {
    id
    name
  }
  email
}
    `;
export const MemberPageGetMemberDocument = gql`
    query MemberPageGetMember($id: String!) {
  account(id: $id) {
    ...MemberPageMember
  }
}
    ${MemberPageMemberFragmentDoc}`;

export function useMemberPageGetMemberQuery(options: Omit<Urql.UseQueryArgs<MemberPageGetMemberQueryVariables>, 'query'>) {
  return Urql.useQuery<MemberPageGetMemberQuery, MemberPageGetMemberQueryVariables>({ query: MemberPageGetMemberDocument, ...options });
};