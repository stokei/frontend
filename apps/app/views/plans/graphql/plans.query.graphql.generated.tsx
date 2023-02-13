import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PlansProductFragmentDoc } from './product.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductPlansQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllProductsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllProductsInput>;
}>;


export type GetProductPlansQuery = { __typename?: 'Query', products: { __typename?: 'Products', items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string } | null }> | null } };


export const GetProductPlansDocument = gql`
    query GetProductPlans($where: WhereDataFindAllProductsInput!, $orderBy: OrderByDataFindAllProductsInput) {
  products(where: $where, orderBy: $orderBy) {
    items {
      ...PlansProduct
    }
  }
}
    ${PlansProductFragmentDoc}`;

export function useGetProductPlansQuery(options: Omit<Urql.UseQueryArgs<GetProductPlansQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductPlansQuery, GetProductPlansQueryVariables>({ query: GetProductPlansDocument, ...options });
};