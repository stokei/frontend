import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppAdminFragmentDoc } from './admin.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppAdminsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAppAdminsInput>;
}>;


export type GetAppAdminsQuery = { __typename?: 'Query', appAdmins: { __typename?: 'AppAdmins', items?: Array<{ __typename?: 'AppAdmin', id: string, admin: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } };


export const GetAppAdminsDocument = gql`
    query GetAppAdmins($where: WhereDataFindAllAppAdminsInput) {
  appAdmins(where: $where) {
    items {
      ...AppAdmin
    }
  }
}
    ${AppAdminFragmentDoc}`;

export function useGetAppAdminsQuery(options?: Omit<Urql.UseQueryArgs<GetAppAdminsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppAdminsQuery, GetAppAdminsQueryVariables>({ query: GetAppAdminsDocument, ...options });
};