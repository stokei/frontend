import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
import { LandingPageProductsCourseFragmentDoc } from './products-course.fragment.graphql.generated';
import { LandingPageProductsPlanFragmentDoc } from './products-plan.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CatalogsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllCatalogsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogsInput>;
}>;


export type CatalogsQuery = { __typename?: 'Query', catalogs: { __typename?: 'Catalogs', totalCount: number, items?: Array<{ __typename?: 'Catalog', id: string, title: string, subtitle?: string | null, items?: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, course?: { __typename?: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } | null }> | null } };

export type LandingPageCatalogFragment = { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null, items?: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, course?: { __typename?: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } | null };

export type LandingPageCatalogProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, course?: { __typename?: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null };

export const LandingPageCatalogProductFragmentDoc = gql`
    fragment LandingPageCatalogProduct on Product {
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
    ...LandingPageProductsCourse
  }
  plan {
    ...LandingPageProductsPlan
  }
}
    ${PriceFragmentDoc}
${LandingPageProductsCourseFragmentDoc}
${LandingPageProductsPlanFragmentDoc}`;
export const LandingPageCatalogFragmentDoc = gql`
    fragment LandingPageCatalog on Catalog {
  id
  title
  subtitle
  items {
    totalCount
    items {
      id
      product {
        ...LandingPageCatalogProduct
      }
    }
  }
}
    ${LandingPageCatalogProductFragmentDoc}`;
export const CatalogsDocument = gql`
    query Catalogs($where: WhereDataFindAllCatalogsInput!, $orderBy: OrderByDataFindAllCatalogsInput) {
  catalogs(where: $where, orderBy: $orderBy) {
    totalCount
    items {
      ...LandingPageCatalog
    }
  }
}
    ${LandingPageCatalogFragmentDoc}`;

export function useCatalogsQuery(options: Omit<Urql.UseQueryArgs<CatalogsQueryVariables>, 'query'>) {
  return Urql.useQuery<CatalogsQuery, CatalogsQueryVariables>({ query: CatalogsDocument, ...options });
};