import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../price/price.fragment.graphql.generated';
export type SortedItemComponentFragment = { __typename?: 'SortedItem', id: string, parent?: string | null, index?: number | null, item?: { __typename: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null } | { __typename: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } } | { __typename: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroType: Types.HeroType, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null, filename: string } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null };

export type SortedItemComponentHeroFragment = { __typename?: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroType: Types.HeroType, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null, filename: string } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SortedItemComponentCatalogFragment = { __typename?: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null };

export type SortedItemComponentCatalogItemFragment = { __typename?: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } };

export type SortedItemComponentCatalogItemProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null };

export type SortedItemComponentCatalogItemProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null };

export type SortedItemComponentCatalogItemProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export const SortedItemComponentHeroFragmentDoc = gql`
    fragment SortedItemComponentHero on Hero {
  heroId: id
  heroTitle: title
  heroType: type
  titleHighlight
  heroSubtitle: subtitle
  video {
    file {
      url
      filename
    }
  }
  image {
    file {
      url
    }
  }
  backgroundImage {
    file {
      url
    }
  }
}
    `;
export const SortedItemComponentCatalogFragmentDoc = gql`
    fragment SortedItemComponentCatalog on Catalog {
  catalogId: id
  catalogTitle: title
  catalogSubtitle: subtitle
}
    `;
export const SortedItemComponentCatalogItemProductCourseFragmentDoc = gql`
    fragment SortedItemComponentCatalogItemProductCourse on Course {
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
export const SortedItemComponentCatalogItemProductPlanFragmentDoc = gql`
    fragment SortedItemComponentCatalogItemProductPlan on Plan {
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
export const SortedItemComponentCatalogItemProductFragmentDoc = gql`
    fragment SortedItemComponentCatalogItemProduct on Product {
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
    ...SortedItemComponentCatalogItemProductCourse
    ...SortedItemComponentCatalogItemProductPlan
  }
}
    ${PriceComponentFragmentDoc}
${SortedItemComponentCatalogItemProductCourseFragmentDoc}
${SortedItemComponentCatalogItemProductPlanFragmentDoc}`;
export const SortedItemComponentCatalogItemFragmentDoc = gql`
    fragment SortedItemComponentCatalogItem on CatalogItem {
  catalogItemId: id
  product {
    ...SortedItemComponentCatalogItemProduct
  }
}
    ${SortedItemComponentCatalogItemProductFragmentDoc}`;
export const SortedItemComponentFragmentDoc = gql`
    fragment SortedItemComponent on SortedItem {
  id
  parent
  index
  item {
    __typename
    ...SortedItemComponentHero
    ...SortedItemComponentCatalog
    ...SortedItemComponentCatalogItem
  }
}
    ${SortedItemComponentHeroFragmentDoc}
${SortedItemComponentCatalogFragmentDoc}
${SortedItemComponentCatalogItemFragmentDoc}`;