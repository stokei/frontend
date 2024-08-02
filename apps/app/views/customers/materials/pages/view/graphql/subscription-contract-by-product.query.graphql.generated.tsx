import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSubscriptionContractActiveByProductQueryVariables = Types.Exact<{
  input: Types.FindSubscriptionContractActiveByProductInput;
}>;


export type GetSubscriptionContractActiveByProductQuery = { __typename?: 'Query', subscriptionContractActiveByProduct: { __typename?: 'SubscriptionContract', id: string, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null }> | null } | null } };

export type SubscriptionContractActiveByProductItemFragment = { __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course' } | { __typename: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null };

export type SubscriptionContractActiveByProductItemMaterialFragment = { __typename?: 'Material', id: string, name: string, description?: string | null, file?: { __typename?: 'File', id: string, url?: string | null } | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SubscriptionContractActiveByProductItemMaterialFragmentDoc = gql`
    fragment SubscriptionContractActiveByProductItemMaterial on Material {
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
export const SubscriptionContractActiveByProductItemFragmentDoc = gql`
    fragment SubscriptionContractActiveByProductItem on SubscriptionContractItem {
  product {
    __typename
    ...SubscriptionContractActiveByProductItemMaterial
  }
}
    ${SubscriptionContractActiveByProductItemMaterialFragmentDoc}`;
export const GetSubscriptionContractActiveByProductDocument = gql`
    query GetSubscriptionContractActiveByProduct($input: FindSubscriptionContractActiveByProductInput!) {
  subscriptionContractActiveByProduct(input: $input) {
    id
    items {
      totalCount
      items {
        ...SubscriptionContractActiveByProductItem
      }
    }
  }
}
    ${SubscriptionContractActiveByProductItemFragmentDoc}`;

export function useGetSubscriptionContractActiveByProductQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionContractActiveByProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionContractActiveByProductQuery, GetSubscriptionContractActiveByProductQueryVariables>({ query: GetSubscriptionContractActiveByProductDocument, ...options });
};