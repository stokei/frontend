import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppCouponFragmentDoc } from '../../../../components/select-coupons/graphql/coupons.query.graphql.generated';
import { PaymentMethodComponentFragmentDoc } from '../../../../components/payment-method/graphql/payment-method.fragment.graphql.generated';
import { PriceComponentFragmentDoc } from '../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetOrderPageOrderQueryVariables = Types.Exact<{
  orderId: Types.Scalars['String'];
}>;


export type GetOrderPageOrderQuery = { __typename?: 'Query', order: { __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, updatedAt?: string | null, createdAt?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, coupon?: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } | null, items?: { __typename?: 'OrderItems', items?: Array<{ __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null } | null, payments?: { __typename?: 'Payments', items?: Array<{ __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } | null, parent: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } } };

export type OrderPageOrderFragment = { __typename?: 'Order', id: string, status: Types.OrderStatus, totalAmount: number, subtotalAmount: number, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, updatedAt?: string | null, createdAt?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, coupon?: { __typename?: 'Coupon', id: string, code: string, active: boolean, amountOff?: number | null, percentOff?: number | null, recipient?: { __typename?: 'Account', id: string, fullname: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null } | null, items?: { __typename?: 'OrderItems', items?: Array<{ __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null }> | null } | null, payments?: { __typename?: 'Payments', items?: Array<{ __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } | null, parent: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } };

export type OrderPagePaymentFragment = { __typename?: 'Payment', id: string, status: Types.PaymentStatus, totalAmount: number, subtotalAmount: number, paymentGatewayType: Types.PaymentGatewayType, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export type OrderPageOrderItemFragment = { __typename?: 'OrderItem', id: string, totalAmount: number, subtotalAmount: number, createdAt?: string | null, product: { __typename?: 'Product', id: string, name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }, recurring?: { __typename?: 'Recurring', interval?: Types.IntervalType | null, intervalCount: number } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null };

export const OrderPageOrderItemFragmentDoc = gql`
    fragment OrderPageOrderItem on OrderItem {
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
export const OrderPagePaymentFragmentDoc = gql`
    fragment OrderPagePayment on Payment {
  id
  paymentMethod {
    ...PaymentMethodComponent
  }
  currency {
    id
    symbol
    minorUnit
  }
  status
  totalAmount
  subtotalAmount
  paymentGatewayType
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    ${PaymentMethodComponentFragmentDoc}`;
export const OrderPageOrderFragmentDoc = gql`
    fragment OrderPageOrder on Order {
  id
  currency {
    id
    symbol
    minorUnit
  }
  coupon {
    ...AppCoupon
  }
  items {
    items {
      ...OrderPageOrderItem
    }
  }
  payments(orderBy: {createdAt: DESC}) {
    items {
      ...OrderPagePayment
    }
  }
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
  status
  totalAmount
  subtotalAmount
  paidAt
  canceledAt
  paymentErrorAt
  updatedAt
  createdAt
}
    ${AppCouponFragmentDoc}
${OrderPageOrderItemFragmentDoc}
${OrderPagePaymentFragmentDoc}`;
export const GetOrderPageOrderDocument = gql`
    query GetOrderPageOrder($orderId: String!) {
  order(id: $orderId) {
    ...OrderPageOrder
  }
}
    ${OrderPageOrderFragmentDoc}`;

export function useGetOrderPageOrderQuery(options: Omit<Urql.UseQueryArgs<GetOrderPageOrderQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrderPageOrderQuery, GetOrderPageOrderQueryVariables>({ query: GetOrderPageOrderDocument, ...options });
};