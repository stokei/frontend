import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type PriceComponentFragment = { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null };

export const PriceComponentFragmentDoc = gql`
    fragment PriceComponent on Price {
  id
  parent
  type
  nickname
  fromAmount
  amount
  discountPercent
  unit
  active
  automaticRenew
  isDefault
  currency {
    id
    symbol
    minorUnit
  }
  billingScheme
  tiersMode
  tiers {
    items {
      id
      amount
      upTo
      infinite
    }
  }
  recurring {
    usageType
    intervalCount
    interval
  }
}
    `;