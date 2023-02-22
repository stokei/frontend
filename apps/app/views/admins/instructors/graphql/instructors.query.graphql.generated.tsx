import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppInstructorFragmentDoc } from './instructor.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppInstructorsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllAppInstructorsInput>;
}>;


export type GetAppInstructorsQuery = { __typename?: 'Query', appInstructors: { __typename?: 'AppInstructors', items?: Array<{ __typename?: 'AppInstructor', id: string, instructor: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> | null } };


export const GetAppInstructorsDocument = gql`
    query GetAppInstructors($where: WhereDataFindAllAppInstructorsInput) {
  appInstructors(where: $where) {
    items {
      ...AppInstructor
    }
  }
}
    ${AppInstructorFragmentDoc}`;

export function useGetAppInstructorsQuery(options?: Omit<Urql.UseQueryArgs<GetAppInstructorsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppInstructorsQuery, GetAppInstructorsQueryVariables>({ query: GetAppInstructorsDocument, ...options });
};