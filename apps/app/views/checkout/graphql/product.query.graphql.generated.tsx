import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import { CheckoutProductCourseFragmentDoc } from './course.fragment.graphql.generated';
import { CheckoutProductPlanFragmentDoc } from './plan.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutProductQueryVariables = Types.Exact<{
  product: Types.Scalars['String'];
}>;


export type GetCheckoutProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, course?: { __typename?: 'Course', id: string, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string } | null } };


export const GetCheckoutProductDocument = gql`
    query GetCheckoutProduct($product: String!) {
  product(id: $product) {
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
      ...Price
    }
    course {
      ...CheckoutProductCourse
    }
    plan {
      ...CheckoutProductPlan
    }
  }
}
    ${PriceFragmentDoc}
${CheckoutProductCourseFragmentDoc}
${CheckoutProductPlanFragmentDoc}`;

export function useGetCheckoutProductQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutProductQuery, GetCheckoutProductQueryVariables>({ query: GetCheckoutProductDocument, ...options });
};