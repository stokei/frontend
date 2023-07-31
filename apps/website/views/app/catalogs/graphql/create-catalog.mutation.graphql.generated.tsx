import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCatalogsPageCatalogFragmentDoc } from './catalogs.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AdminCatalogsPageCreateCatalogMutationVariables = Types.Exact<{
  input: Types.CreateCatalogInput;
}>;


export type AdminCatalogsPageCreateCatalogMutation = { __typename?: 'Mutation', createCatalog: { __typename?: 'Catalog', id: string, title: string, subtitle?: string | null, items?: { __typename?: 'CatalogItems', items?: Array<{ __typename?: 'CatalogItem', catalogItemId: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null } | null } }> | null } | null } };


export const AdminCatalogsPageCreateCatalogDocument = gql`
    mutation AdminCatalogsPageCreateCatalog($input: CreateCatalogInput!) {
  createCatalog(input: $input) {
    ...AdminCatalogsPageCatalog
  }
}
    ${AdminCatalogsPageCatalogFragmentDoc}`;

export function useAdminCatalogsPageCreateCatalogMutation() {
  return Urql.useMutation<AdminCatalogsPageCreateCatalogMutation, AdminCatalogsPageCreateCatalogMutationVariables>(AdminCatalogsPageCreateCatalogDocument);
};