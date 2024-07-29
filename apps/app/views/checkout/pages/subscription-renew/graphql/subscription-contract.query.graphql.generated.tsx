import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PaymentMethodComponentFragmentDoc } from '../../../../../components/payment-method/graphql/payment-method.fragment.graphql.generated';
import { PriceComponentFragmentDoc } from '../../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSubscriptionRenewPageSubscriptionContractQueryVariables = Types.Exact<{
  subscriptionContractId: Types.Scalars['String'];
}>;


export type GetSubscriptionRenewPageSubscriptionContractQuery = { __typename?: 'Query', subscriptionContract: { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', id: string, quantity: number, recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null } };

export type SubscriptionRenewPageSubscriptionContractFragment = { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', id: string, quantity: number, recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type?: Types.PaymentMethodType | null, parent: string, referenceId?: string | null, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null };

export type SubscriptionRenewPageSubscriptionContractItemFragment = { __typename?: 'SubscriptionContractItem', id: string, quantity: number, recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, price?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null };

export type SubscriptionRenewPageSubscriptionContractProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SubscriptionRenewPageSubscriptionContractProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string };

export type SubscriptionRenewPageSubscriptionContractProductMaterialFragment = { __typename?: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SubscriptionRenewPageSubscriptionContractProductProductFragment = { __typename?: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SubscriptionRenewPageSubscriptionContractProductCourseFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContractProductCourse on Course {
  courseId: id
  courseName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionRenewPageSubscriptionContractProductPlanFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContractProductPlan on Plan {
  planId: id
  planName: name
}
    `;
export const SubscriptionRenewPageSubscriptionContractProductMaterialFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContractProductMaterial on Material {
  materialId: id
  materialName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionRenewPageSubscriptionContractProductProductFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContractProductProduct on Product {
  productId: id
  productName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionRenewPageSubscriptionContractItemFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContractItem on SubscriptionContractItem {
  id
  quantity
  recurring {
    id
    usageType
    intervalCount
    interval
  }
  price {
    ...PriceComponent
  }
  product {
    __typename
    ...SubscriptionRenewPageSubscriptionContractProductCourse
    ...SubscriptionRenewPageSubscriptionContractProductPlan
    ...SubscriptionRenewPageSubscriptionContractProductMaterial
    ...SubscriptionRenewPageSubscriptionContractProductProduct
  }
}
    ${PriceComponentFragmentDoc}
${SubscriptionRenewPageSubscriptionContractProductCourseFragmentDoc}
${SubscriptionRenewPageSubscriptionContractProductPlanFragmentDoc}
${SubscriptionRenewPageSubscriptionContractProductMaterialFragmentDoc}
${SubscriptionRenewPageSubscriptionContractProductProductFragmentDoc}`;
export const SubscriptionRenewPageSubscriptionContractFragmentDoc = gql`
    fragment SubscriptionRenewPageSubscriptionContract on SubscriptionContract {
  id
  type
  status
  startAt
  endAt
  canceledAt
  createdAt
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
  items {
    totalCount
    items {
      ...SubscriptionRenewPageSubscriptionContractItem
    }
  }
  paymentMethod {
    ...PaymentMethodComponent
  }
}
    ${SubscriptionRenewPageSubscriptionContractItemFragmentDoc}
${PaymentMethodComponentFragmentDoc}`;
export const GetSubscriptionRenewPageSubscriptionContractDocument = gql`
    query GetSubscriptionRenewPageSubscriptionContract($subscriptionContractId: String!) {
  subscriptionContract(id: $subscriptionContractId) {
    ...SubscriptionRenewPageSubscriptionContract
  }
}
    ${SubscriptionRenewPageSubscriptionContractFragmentDoc}`;

export function useGetSubscriptionRenewPageSubscriptionContractQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionRenewPageSubscriptionContractQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionRenewPageSubscriptionContractQuery, GetSubscriptionRenewPageSubscriptionContractQueryVariables>({ query: GetSubscriptionRenewPageSubscriptionContractDocument, ...options });
};