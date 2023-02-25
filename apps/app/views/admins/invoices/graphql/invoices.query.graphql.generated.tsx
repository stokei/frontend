import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { AppInvoiceFragmentDoc } from './invoice.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppInvoicesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllInvoicesInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllInvoicesInput>;
}>;


export type GetAppInvoicesQuery = { __typename?: 'Query', invoices: { __typename?: 'Invoices', items?: Array<{ __typename?: 'Invoice', id: string, status: Types.InvoiceStatus, totalAmount: number, subtotalAmount: number, url?: string | null, paidAt?: string | null, canceledAt?: string | null, paymentErrorAt?: string | null, customerApp?: { __typename?: 'App', id: string, name: string, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, customerAccount?: { __typename?: 'Account', id: string, firstname: string, fullname: string, email: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, subscriptionContract?: { __typename?: 'SubscriptionContract', id: string } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number } }> | null } };


export const GetAppInvoicesDocument = gql`
    query GetAppInvoices($where: WhereDataFindAllInvoicesInput, $orderBy: OrderByDataFindAllInvoicesInput) {
  invoices(where: $where, orderBy: $orderBy) {
    items {
      ...AppInvoice
    }
  }
}
    ${AppInvoiceFragmentDoc}`;

export function useGetAppInvoicesQuery(options?: Omit<Urql.UseQueryArgs<GetAppInvoicesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppInvoicesQuery, GetAppInvoicesQueryVariables>({ query: GetAppInvoicesDocument, ...options });
};