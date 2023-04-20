import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CatalogItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllCatalogItemsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type CatalogItemsQuery = { __typename?: 'Query', catalogItems: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } };

export type LandingPageCatalogItemFragment = { __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } };

export type LandingPageCatalogItemProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null };

export type LandingPageCatalogItemProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null };

export type LandingPageCatalogItemProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export const LandingPageCatalogItemProductCourseFragmentDoc = gql`
    fragment LandingPageCatalogItemProductCourse on Course {
  courseId: id
  courseName: name
  instructors {
    items {
      id
      instructor {
        fullname
      }
    }
  }
}
    `;
export const LandingPageCatalogItemProductPlanFragmentDoc = gql`
    fragment LandingPageCatalogItemProductPlan on Plan {
  planId: id
  planName: name
  features {
    items {
      id
      name
      description
    }
  }
}
    `;
export const LandingPageCatalogItemProductFragmentDoc = gql`
    fragment LandingPageCatalogItemProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  defaultPrice {
    ...PriceComponent
  }
  parent {
    __typename
    ...LandingPageCatalogItemProductCourse
    ...LandingPageCatalogItemProductPlan
  }
}
    ${PriceComponentFragmentDoc}
${LandingPageCatalogItemProductCourseFragmentDoc}
${LandingPageCatalogItemProductPlanFragmentDoc}`;
export const LandingPageCatalogItemFragmentDoc = gql`
    fragment LandingPageCatalogItem on CatalogItem {
  id
  product {
    ...LandingPageCatalogItemProduct
  }
}
    ${LandingPageCatalogItemProductFragmentDoc}`;
export const CatalogItemsDocument = gql`
    query CatalogItems($where: WhereDataFindAllCatalogItemsInput!, $orderBy: OrderByDataFindAllCatalogItemsInput, $page: PaginationInput) {
  catalogItems(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    items {
      ...LandingPageCatalogItem
    }
  }
}
    ${LandingPageCatalogItemFragmentDoc}`;

export function useCatalogItemsQuery(options: Omit<Urql.UseQueryArgs<CatalogItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<CatalogItemsQuery, CatalogItemsQueryVariables>({ query: CatalogItemsDocument, ...options });
};