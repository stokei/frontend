import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { SubscriptionContractProductCourseFragmentDoc, SubscriptionContractProductPlanFragmentDoc } from '../../subscriptions/graphql/subscription-contracts.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetSubscriptionPageSubscriptionContractQueryVariables = Types.Exact<{
  subscriptionContractId: Types.Scalars['String'];
}>;


export type GetSubscriptionPageSubscriptionContractQuery = { __typename?: 'Query', subscriptionContract: { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product' } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null } };

export type SubscriptionPageSubscriptionContractFragment = { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material' } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product' } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null };

export type SubscriptionPageSubscriptionContractProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SubscriptionPageSubscriptionContractProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string };

export const SubscriptionPageSubscriptionContractFragmentDoc = gql`
    fragment SubscriptionPageSubscriptionContract on SubscriptionContract {
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
      recurring {
        id
        usageType
        intervalCount
        interval
      }
      product {
        __typename
        ...SubscriptionContractProductCourse
        ...SubscriptionContractProductPlan
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
}
    ${SubscriptionContractProductCourseFragmentDoc}
${SubscriptionContractProductPlanFragmentDoc}`;
export const SubscriptionPageSubscriptionContractProductCourseFragmentDoc = gql`
    fragment SubscriptionPageSubscriptionContractProductCourse on Course {
  courseId: id
  courseName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionPageSubscriptionContractProductPlanFragmentDoc = gql`
    fragment SubscriptionPageSubscriptionContractProductPlan on Plan {
  planId: id
  planName: name
}
    `;
export const GetSubscriptionPageSubscriptionContractDocument = gql`
    query GetSubscriptionPageSubscriptionContract($subscriptionContractId: String!) {
  subscriptionContract(id: $subscriptionContractId) {
    ...SubscriptionPageSubscriptionContract
  }
}
    ${SubscriptionPageSubscriptionContractFragmentDoc}`;

export function useGetSubscriptionPageSubscriptionContractQuery(options: Omit<Urql.UseQueryArgs<GetSubscriptionPageSubscriptionContractQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSubscriptionPageSubscriptionContractQuery, GetSubscriptionPageSubscriptionContractQueryVariables>({ query: GetSubscriptionPageSubscriptionContractDocument, ...options });
};