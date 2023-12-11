import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppBillingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAppBillingQuery = { __typename?: 'Query', billing: { __typename?: 'Billing', total?: number | null, currency?: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } | null, items?: Array<{ __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null } };

export type AppBillingFragment = { __typename?: 'Billing', total?: number | null, currency?: { __typename?: 'Currency', id: string, minorUnit: number, symbol: string } | null, items?: Array<{ __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null };

export type AppBillingItemFragment = { __typename?: 'BillingItem', unitAmount?: number | null, quantity?: number | null, total?: number | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null };

export const AppBillingItemFragmentDoc = gql`
    fragment AppBillingItem on BillingItem {
  unitAmount
  quantity
  total
  price {
    ...PriceComponent
  }
}
    ${PriceComponentFragmentDoc}`;
export const AppBillingFragmentDoc = gql`
    fragment AppBilling on Billing {
  total
  currency {
    id
    minorUnit
    symbol
  }
  items {
    ...AppBillingItem
  }
}
    ${AppBillingItemFragmentDoc}`;
export const GetAppBillingDocument = gql`
    query GetAppBilling {
  billing {
    ...AppBilling
  }
}
    ${AppBillingFragmentDoc}`;

export function useGetAppBillingQuery(options?: Omit<Urql.UseQueryArgs<GetAppBillingQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppBillingQuery, GetAppBillingQueryVariables>({ query: GetAppBillingDocument, ...options });
};