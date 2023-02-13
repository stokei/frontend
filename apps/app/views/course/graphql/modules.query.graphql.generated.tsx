import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CoursePageModuleFragmentDoc } from './module.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetModulesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllModulesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllModulesInput>;
}>;


export type GetModulesQuery = { __typename?: 'Query', modules: { __typename?: 'Modules', totalCount: number, items?: Array<{ __typename?: 'Module', id: string, name: string, videos?: { __typename?: 'Videos', totalCount: number, items?: Array<{ __typename?: 'Video', id: string, name: string, private: boolean, active: boolean, file?: { __typename?: 'File', url?: string | null, duration?: number | null } | null }> | null } | null }> | null } };


export const GetModulesDocument = gql`
    query GetModules($where: WhereDataFindAllModulesInput, $orderBy: OrderByDataFindAllModulesInput) {
  modules(where: $where, orderBy: $orderBy) {
    totalCount
    items {
      ...CoursePageModule
    }
  }
}
    ${CoursePageModuleFragmentDoc}`;

export function useGetModulesQuery(options?: Omit<Urql.UseQueryArgs<GetModulesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetModulesQuery, GetModulesQueryVariables>({ query: GetModulesDocument, ...options });
};