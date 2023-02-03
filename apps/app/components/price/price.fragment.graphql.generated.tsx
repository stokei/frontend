import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type PriceFragment = { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null };

export const PriceFragmentDoc = gql`
    fragment Price on Price {
  id
  fromAmount
  amount
  unit
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