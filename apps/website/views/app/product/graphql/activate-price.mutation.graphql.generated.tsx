import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ActivatePriceMutationVariables = Types.Exact<{
  input: Types.ActivatePriceInput;
}>;


export type ActivatePriceMutation = { __typename?: 'Mutation', activatePrice: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } };


export const ActivatePriceDocument = gql`
    mutation ActivatePrice($input: ActivatePriceInput!) {
  activatePrice(input: $input) {
    ...PriceComponent
  }
}
    ${PriceComponentFragmentDoc}`;

export function useActivatePriceMutation() {
  return Urql.useMutation<ActivatePriceMutation, ActivatePriceMutationVariables>(ActivatePriceDocument);
};