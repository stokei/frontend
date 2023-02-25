import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type AppInvoiceFragment = { __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, customerApp?: { __typename?: 'App', id: string, name: string, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, customerAccount?: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', id: string } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } };

export const AppInvoiceFragmentDoc = gql`
    fragment AppInvoice on Invoice {
  id
  customerApp {
    id
    name
    logo {
      file {
        url
      }
    }
  }
  customerAccount {
    id
    firstname
    fullname
    email
    avatar {
      file {
        url
      }
    }
  }
  subscriptionContract {
    id
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
}
    `;