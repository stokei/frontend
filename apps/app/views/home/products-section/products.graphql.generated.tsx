import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProductsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllProductsInput;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', items?: Array<{ __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, course?: { __typename?: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null }> | null } };


export const ProductsDocument = gql`
    query Products($where: WhereDataFindAllProductsInput!) {
  products(where: $where) {
    items {
      id
      name
      description
      avatar {
        file {
          url
        }
      }
      defaultPrice {
        ...Price
      }
      prices {
        items {
          ...Price
        }
      }
      course {
        instructors {
          items {
            id
            instructor {
              fullname
            }
          }
        }
      }
      plan {
        id
        name
        features {
          items {
            id
            name
            description
          }
        }
      }
    }
  }
}
    ${PriceFragmentDoc}`;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery, ProductsQueryVariables>({ query: ProductsDocument, ...options });
};