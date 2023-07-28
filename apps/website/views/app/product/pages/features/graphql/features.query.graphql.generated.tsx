import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductPageFeaturesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllFeaturesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllFeaturesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetProductPageFeaturesQuery = { __typename?: 'Query', features: { __typename?: 'Features', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } };

export type ProductPageFeatureFragment = { __typename?: 'Feature', id: string, name: string, description?: string | null };

export const ProductPageFeatureFragmentDoc = gql`
    fragment ProductPageFeature on Feature {
  id
  name
  description
}
    `;
export const GetProductPageFeaturesDocument = gql`
    query GetProductPageFeatures($where: WhereDataFindAllFeaturesInput, $orderBy: OrderByDataFindAllFeaturesInput, $page: PaginationInput) {
  features(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    totalCount
    items {
      ...ProductPageFeature
    }
  }
}
    ${ProductPageFeatureFragmentDoc}`;

export function useGetProductPageFeaturesQuery(options?: Omit<Urql.UseQueryArgs<GetProductPageFeaturesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductPageFeaturesQuery, GetProductPageFeaturesQueryVariables>({ query: GetProductPageFeaturesDocument, ...options });
};