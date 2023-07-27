import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AppBillingPageInvoicesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllInvoicesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllInvoicesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type AppBillingPageInvoicesQuery = { __typename?: 'Query', invoices: { __typename?: 'Invoices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, customer?: { __typename: 'Account' } | { __typename: 'App', id: string, name: string, email?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', items?: { __typename?: 'SubscriptionContractItems', items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } };

export type AppBillingPageInvoiceFragment = { __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, customer?: { __typename: 'Account' } | { __typename: 'App', id: string, name: string, email?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', items?: { __typename?: 'SubscriptionContractItems', items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null }> | null } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export const AppBillingPageInvoiceFragmentDoc = gql`
    fragment AppBillingPageInvoice on Invoice {
  id
  customer {
    __typename
    ... on App {
      id
      name
      email
      logo {
        file {
          url
        }
      }
    }
  }
  subscriptionContract {
    items(page: {limit: 1}) {
      items {
        recurring {
          usageType
          intervalCount
          interval
        }
      }
    }
  }
  paymentMethod {
    id
    cardBrand
    cardExpiryMonth
    cardExpiryYear
    lastFourCardNumber
  }
  currency {
    id
    symbol
    minorUnit
  }
  status
  totalAmount
  subtotalAmount
  url
  paidAt
  canceledAt
  paymentErrorAt
  createdAt
}
    `;
export const AppBillingPageInvoicesDocument = gql`
    query AppBillingPageInvoices($where: WhereDataFindAllInvoicesInput, $orderBy: OrderByDataFindAllInvoicesInput, $page: PaginationInput) {
  invoices(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppBillingPageInvoice
    }
  }
}
    ${AppBillingPageInvoiceFragmentDoc}`;

export function useAppBillingPageInvoicesQuery(options?: Omit<Urql.UseQueryArgs<AppBillingPageInvoicesQueryVariables>, 'query'>) {
  return Urql.useQuery<AppBillingPageInvoicesQuery, AppBillingPageInvoicesQueryVariables>({ query: AppBillingPageInvoicesDocument, ...options });
};