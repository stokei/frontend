import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceFragmentDoc } from '../../../components/price/price.fragment.graphql.generated';
export type PlansProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, features?: { __typename?: 'Features', totalCount: number, items?: Array<{ __typename?: 'Feature', id: string, name: string }> | null } | null, defaultPrice?: { __typename?: 'Price', id: string, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, plan?: { __typename?: 'Plan', id: string, name: string } | null };

export const PlansProductFragmentDoc = gql`
    fragment PlansProduct on Product {
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
  plan {
    id
    name
  }
}
    ${PriceFragmentDoc}`;