import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AdminCatalogPageCatalogItemFragmentDoc } from './catalog-items.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CreateCatalogItemMutationVariables = Types.Exact<{
  input: Types.CreateCatalogItemInput;
}>;


export type CreateCatalogItemMutation = { __typename?: 'Mutation', createCatalogItem: { __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, parent?: string | null, name: string, description?: string | null, type: Types.ProductType, externalReferenceId?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, prices?: { __typename?: 'Prices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null, combo?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, type: Types.ProductType, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null, externalReference?: { __typename: 'App' } | { __typename: 'Course', instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material' } | { __typename: 'Plan', type: Types.PlanType } | { __typename: 'Product' } | null } } };


export const CreateCatalogItemDocument = gql`
    mutation CreateCatalogItem($input: CreateCatalogItemInput!) {
  createCatalogItem(input: $input) {
    ...AdminCatalogPageCatalogItem
  }
}
    ${AdminCatalogPageCatalogItemFragmentDoc}`;

export function useCreateCatalogItemMutation() {
  return Urql.useMutation<CreateCatalogItemMutation, CreateCatalogItemMutationVariables>(CreateCatalogItemDocument);
};