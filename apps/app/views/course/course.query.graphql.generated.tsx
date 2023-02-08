import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceFragmentDoc } from '../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetProductCourseQueryVariables = Types.Exact<{
  product: Types.Scalars['String'];
}>;


export type GetProductCourseQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, course?: { __typename?: 'Course', id: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null } };


export const GetProductCourseDocument = gql`
    query GetProductCourse($product: String!) {
  product(id: $product) {
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
    course {
      id
      instructors {
        items {
          id
          instructor {
            fullname
          }
        }
      }
    }
  }
}
    ${PriceFragmentDoc}`;

export function useGetProductCourseQuery(options: Omit<Urql.UseQueryArgs<GetProductCourseQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductCourseQuery, GetProductCourseQueryVariables>({ query: GetProductCourseDocument, ...options });
};