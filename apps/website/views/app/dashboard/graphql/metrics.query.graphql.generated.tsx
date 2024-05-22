import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetMetricsQueryVariables = Types.Exact<{
  startAt: Types.Scalars['String'];
  endAt: Types.Scalars['String'];
}>;


export type GetMetricsQuery = { __typename?: 'Query', accessesFrequencyByPeriod: Array<{ __typename?: 'ChartData', label: string, value: string }>, accessesHoursByPeriod: Array<{ __typename?: 'ChartData', label: string, value: string }>, ordersFrequencyByPeriod: Array<{ __typename?: 'ChartData', label: string, value: string }>, paymentMethodsMostUsedByPeriod: Array<{ __typename?: 'ChartData', label: string, value: string }>, productsBestSellerByPeriod: Array<{ __typename?: 'ProductBestSeller', quantity: number, product: { __typename?: 'Product', name: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } }> };


export const GetMetricsDocument = gql`
    query GetMetrics($startAt: String!, $endAt: String!) {
  accessesFrequencyByPeriod(where: {startAt: $startAt, endAt: $endAt}) {
    label
    value
  }
  accessesHoursByPeriod(where: {startAt: $startAt, endAt: $endAt}) {
    label
    value
  }
  ordersFrequencyByPeriod(where: {status: PAID, startAt: $startAt, endAt: $endAt}) {
    label
    value
  }
  paymentMethodsMostUsedByPeriod(where: {startAt: $startAt, endAt: $endAt}) {
    label
    value
  }
  productsBestSellerByPeriod(where: {startAt: $startAt, endAt: $endAt}) {
    quantity
    product {
      name
      avatar {
        file {
          url
        }
      }
    }
  }
}
    `;

export function useGetMetricsQuery(options: Omit<Urql.UseQueryArgs<GetMetricsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMetricsQuery, GetMetricsQueryVariables>({ query: GetMetricsDocument, ...options });
};