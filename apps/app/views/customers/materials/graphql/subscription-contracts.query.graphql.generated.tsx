import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppSubscriptionContractsByItemMaterialsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllSubscriptionContractsByItemInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllSubscriptionContractsByItemInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppSubscriptionContractsByItemMaterialsQuery = { __typename?: 'Query', subscriptionContractsByItem: { __typename?: 'SubscriptionContracts', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SubscriptionContract', id: string, items?: { __typename?: 'SubscriptionContractItems', items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null }> | null } | null }> | null } };

export type AppSubscriptionContractsByItemMaterialFragment = { __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null };

export type AppSubscriptionContractsByItemMaterialProductMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppSubscriptionContractsByItemMaterialProductMaterialFragmentDoc = gql`
    fragment AppSubscriptionContractsByItemMaterialProductMaterial on Material {
  id
  name
  description
  file {
    id
    url
  }
  avatar {
    file {
      url
    }
  }
}
    `;
export const AppSubscriptionContractsByItemMaterialFragmentDoc = gql`
    fragment AppSubscriptionContractsByItemMaterial on SubscriptionContractItem {
  product {
    __typename
    ...AppSubscriptionContractsByItemMaterialProductMaterial
  }
}
    ${AppSubscriptionContractsByItemMaterialProductMaterialFragmentDoc}`;
export const GetAppSubscriptionContractsByItemMaterialsDocument = gql`
    query GetAppSubscriptionContractsByItemMaterials($where: WhereDataFindAllSubscriptionContractsByItemInput, $orderBy: OrderByDataFindAllSubscriptionContractsByItemInput, $page: PaginationInput) {
  subscriptionContractsByItem(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      id
      items {
        items {
          ...AppSubscriptionContractsByItemMaterial
        }
      }
    }
  }
}
    ${AppSubscriptionContractsByItemMaterialFragmentDoc}`;

export function useGetAppSubscriptionContractsByItemMaterialsQuery(options?: Omit<Urql.UseQueryArgs<GetAppSubscriptionContractsByItemMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppSubscriptionContractsByItemMaterialsQuery, GetAppSubscriptionContractsByItemMaterialsQueryVariables>({ query: GetAppSubscriptionContractsByItemMaterialsDocument, ...options });
};