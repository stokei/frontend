import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppCouponFragmentDoc } from '../../../../components/select-coupons/graphql/coupons.query.graphql.generated';
import { PriceComponentFragmentDoc } from '../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppOrdersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllOrdersInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllOrdersInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppOrdersQuery = { __typename?: 'Query', orders: { __typename?: 'Orders', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, parent: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, coupon?: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, items?: { __typename?: 'OrderItems', items?: Array<{ __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null } | null }> | null } };

export type AppOrderFragment = { __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, parent: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, coupon?: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, items?: { __typename?: 'OrderItems', items?: Array<{ __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null } | null };

export type AppOrderItemFragment = { __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null };

export const AppOrderItemFragmentDoc = gql`
    fragment AppOrderItem on OrderItem {
  id
  product {
    id
    name
    avatar {
      file {
        url
      }
    }
  }
  recurring {
    interval
    intervalCount
  }
  price {
    ...PriceComponent
  }
  totalAmount
  subtotalAmount
  createdAt
}
    ${PriceComponentFragmentDoc}`;
export const AppOrderFragmentDoc = gql`
    fragment AppOrder on Order {
  id
  parent {
    __typename
    ... on App {
      id
      name
      accountEmail: email
      logo {
        file {
          url
        }
      }
    }
    ... on Account {
      id
      firstname
      fullname
      appEmail: email
      avatar {
        file {
          url
        }
      }
    }
  }
  coupon {
    ...AppCoupon
  }
  currency {
    id
    symbol
    minorUnit
  }
  items {
    items {
      ...AppOrderItem
    }
  }
  status
  totalAmount
  subtotalAmount
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    ${AppCouponFragmentDoc}
${AppOrderItemFragmentDoc}`;
export const GetAppOrdersDocument = gql`
    query GetAppOrders($where: WhereDataFindAllOrdersInput, $orderBy: OrderByDataFindAllOrdersInput, $page: PaginationInput) {
  orders(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppOrder
    }
  }
}
    ${AppOrderFragmentDoc}`;

export function useGetAppOrdersQuery(options?: Omit<Urql.UseQueryArgs<GetAppOrdersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppOrdersQuery, GetAppOrdersQueryVariables>({ query: GetAppOrdersDocument, ...options });
};