import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppInvoicesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllInvoicesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllInvoicesInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppInvoicesQuery = { __typename?: 'Query', invoices: { __typename?: 'Invoices', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, customer?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', items?: { __typename?: 'SubscriptionContractItems', items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | null }> | null } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } };

export type AppInvoiceFragment = { __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, createdAt?: string | null, customer?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', items?: { __typename?: 'SubscriptionContractItems', items?: Array<{ __typename?: 'SubscriptionContractItem', product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | null }> | null } | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export type InvoiceProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type InvoiceProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string };

export const InvoiceProductCourseFragmentDoc = gql`
    fragment InvoiceProductCourse on Course {
  courseId: id
  courseName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const InvoiceProductPlanFragmentDoc = gql`
    fragment InvoiceProductPlan on Plan {
  planId: id
  planName: name
}
    `;
export const AppInvoiceFragmentDoc = gql`
    fragment AppInvoice on Invoice {
  id
  customer {
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
  subscriptionContract {
    items(page: {limit: 1}) {
      items {
        product {
          __typename
          ...InvoiceProductCourse
          ...InvoiceProductPlan
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
    ${InvoiceProductCourseFragmentDoc}
${InvoiceProductPlanFragmentDoc}`;
export const GetAppInvoicesDocument = gql`
    query GetAppInvoices($where: WhereDataFindAllInvoicesInput, $orderBy: OrderByDataFindAllInvoicesInput, $page: PaginationInput) {
  invoices(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppInvoice
    }
  }
}
    ${AppInvoiceFragmentDoc}`;

export function useGetAppInvoicesQuery(options?: Omit<Urql.UseQueryArgs<GetAppInvoicesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppInvoicesQuery, GetAppInvoicesQueryVariables>({ query: GetAppInvoicesDocument, ...options });
};