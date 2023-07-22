import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppSubscriptionContractItemsMaterialsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllSubscriptionContractItemsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllSubscriptionContractItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppSubscriptionContractItemsMaterialsQuery = { __typename?: 'Query', subscriptionContractItems: { __typename?: 'SubscriptionContractItems', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null }> | null } };

export type AppSubscriptionContractItemMaterialFragment = { __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null };

export type SubscriptionContractItemProductMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SubscriptionContractItemProductMaterialFragmentDoc = gql`
    fragment SubscriptionContractItemProductMaterial on Material {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
}
    `;
export const AppSubscriptionContractItemMaterialFragmentDoc = gql`
    fragment AppSubscriptionContractItemMaterial on SubscriptionContractItem {
  product {
    __typename
    ...SubscriptionContractItemProductMaterial
  }
}
    ${SubscriptionContractItemProductMaterialFragmentDoc}`;
export const GetAppSubscriptionContractItemsMaterialsDocument = gql`
    query GetAppSubscriptionContractItemsMaterials($where: WhereDataFindAllSubscriptionContractItemsInput, $orderBy: OrderByDataFindAllSubscriptionContractItemsInput, $page: PaginationInput) {
  subscriptionContractItems(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppSubscriptionContractItemMaterial
    }
  }
}
    ${AppSubscriptionContractItemMaterialFragmentDoc}`;

export function useGetAppSubscriptionContractItemsMaterialsQuery(options?: Omit<Urql.UseQueryArgs<GetAppSubscriptionContractItemsMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppSubscriptionContractItemsMaterialsQuery, GetAppSubscriptionContractItemsMaterialsQueryVariables>({ query: GetAppSubscriptionContractItemsMaterialsDocument, ...options });
};