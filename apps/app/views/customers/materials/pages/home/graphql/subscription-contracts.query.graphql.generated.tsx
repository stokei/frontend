import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppSubscriptionContractItemsBySubscriptionMaterialsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllSubscriptionContractItemsBySubscriptionInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppSubscriptionContractItemsBySubscriptionMaterialsQuery = { __typename?: 'Query', subscriptionContractItemsBySubscription: { __typename?: 'SubscriptionContractItems', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null }> | null } };

export type AppSubscriptionContractItemsBySubscriptionMaterialFragment = { __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null };

export type AppSubscriptionContractItemsBySubscriptionMaterialProductMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AppSubscriptionContractItemsBySubscriptionMaterialProductMaterialFragmentDoc = gql`
    fragment AppSubscriptionContractItemsBySubscriptionMaterialProductMaterial on Material {
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
export const AppSubscriptionContractItemsBySubscriptionMaterialFragmentDoc = gql`
    fragment AppSubscriptionContractItemsBySubscriptionMaterial on SubscriptionContractItem {
  product {
    __typename
    ...AppSubscriptionContractItemsBySubscriptionMaterialProductMaterial
  }
}
    ${AppSubscriptionContractItemsBySubscriptionMaterialProductMaterialFragmentDoc}`;
export const GetAppSubscriptionContractItemsBySubscriptionMaterialsDocument = gql`
    query GetAppSubscriptionContractItemsBySubscriptionMaterials($where: WhereDataFindAllSubscriptionContractItemsBySubscriptionInput, $orderBy: OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput, $page: PaginationInput) {
  subscriptionContractItemsBySubscription(
    where: $where
    orderBy: $orderBy
    page: $page
  ) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppSubscriptionContractItemsBySubscriptionMaterial
    }
  }
}
    ${AppSubscriptionContractItemsBySubscriptionMaterialFragmentDoc}`;

export function useGetAppSubscriptionContractItemsBySubscriptionMaterialsQuery(options?: Omit<Urql.UseQueryArgs<GetAppSubscriptionContractItemsBySubscriptionMaterialsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppSubscriptionContractItemsBySubscriptionMaterialsQuery, GetAppSubscriptionContractItemsBySubscriptionMaterialsQueryVariables>({ query: GetAppSubscriptionContractItemsBySubscriptionMaterialsDocument, ...options });
};