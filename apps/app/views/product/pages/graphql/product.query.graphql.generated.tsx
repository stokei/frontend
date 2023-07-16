import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductPageProductQueryVariables = Types.Exact<{
  product: Types.Scalars['String'];
}>;


export type GetProductPageProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, parentId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course' } | { __typename: 'Plan' } | null } };

export type ProductPageProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, parentId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course' } | { __typename: 'Plan' } | null };

export const ProductPageProductFragmentDoc = gql`
    fragment ProductPageProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  features {
    totalCount
    items {
      id
      name
    }
  }
  defaultPrice {
    ...PriceComponent
  }
  parentId
  parent {
    __typename
  }
}
    ${PriceComponentFragmentDoc}`;
export const GetProductPageProductDocument = gql`
    query GetProductPageProduct($product: String!) {
  product(id: $product) {
    ...ProductPageProduct
  }
}
    ${ProductPageProductFragmentDoc}`;

export function useGetProductPageProductQuery(options: Omit<Urql.UseQueryArgs<GetProductPageProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductPageProductQuery, GetProductPageProductQueryVariables>({ query: GetProductPageProductDocument, ...options });
};