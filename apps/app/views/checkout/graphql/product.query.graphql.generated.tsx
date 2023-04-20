import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCheckoutProductQueryVariables = Types.Exact<{
  product: Types.Scalars['String'];
}>;


export type GetCheckoutProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, parent?: { __typename: 'Course', courseId: string, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Plan', planId: string, planName: string } | null } };

export type CheckoutProductCourseFragment = { __typename?: 'Course', courseId: string, instructors?: { __typename?: 'CourseInstructors', totalCount: number, items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export type CheckoutProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string };

export const CheckoutProductCourseFragmentDoc = gql`
    fragment CheckoutProductCourse on Course {
  courseId: id
  instructors {
    totalCount
    items {
      id
      instructor {
        fullname
      }
    }
  }
}
    `;
export const CheckoutProductPlanFragmentDoc = gql`
    fragment CheckoutProductPlan on Plan {
  planId: id
  planName: name
}
    `;
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
      ...PriceComponent
    }
    prices {
      totalCount
      items {
        ...PriceComponent
      }
    }
    parent {
      __typename
      ...CheckoutProductCourse
      ...CheckoutProductPlan
    }
  }
}
    ${PriceComponentFragmentDoc}
${CheckoutProductCourseFragmentDoc}
${CheckoutProductPlanFragmentDoc}`;

export function useGetCheckoutProductQuery(options: Omit<Urql.UseQueryArgs<GetCheckoutProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCheckoutProductQuery, GetCheckoutProductQueryVariables>({ query: GetCheckoutProductDocument, ...options });
};