import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAppSubscriptionContractsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllSubscriptionContractsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllSubscriptionContractsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAppSubscriptionContractsQuery = { __typename?: 'Query', subscriptionContracts: { __typename?: 'SubscriptionContracts', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null }> | null } };

export type AppSubscriptionContractFragment = { __typename?: 'SubscriptionContract', id: string, type: Types.SubscriptionContractType, status: Types.SubscriptionContractStatus, startAt?: string | null, endAt?: string | null, canceledAt?: string | null, createdAt?: string | null, parent?: { __typename: 'Account', id: string, firstname: string, fullname: string, appEmail: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'App', id: string, name: string, accountEmail?: string | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null, items?: { __typename?: 'SubscriptionContractItems', totalCount: number, items?: Array<{ __typename?: 'SubscriptionContractItem', recurring?: { __typename?: 'Recurring', id: string, usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null, product?: { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan', planId: string, planName: string } | { __typename: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null }> | null } | null, paymentMethod?: { __typename?: 'PaymentMethod', id: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null } | null };

export type SubscriptionContractProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SubscriptionContractProductPlanFragment = { __typename?: 'Plan', planId: string, planName: string };

export type SubscriptionContractProductMaterialFragment = { __typename?: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SubscriptionContractProductProductFragment = { __typename?: 'Product', productId: string, productName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const SubscriptionContractProductCourseFragmentDoc = gql`
    fragment SubscriptionContractProductCourse on Course {
  courseId: id
  courseName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionContractProductPlanFragmentDoc = gql`
    fragment SubscriptionContractProductPlan on Plan {
  planId: id
  planName: name
}
    `;
export const SubscriptionContractProductProductFragmentDoc = gql`
    fragment SubscriptionContractProductProduct on Product {
  productId: id
  productName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const SubscriptionContractProductMaterialFragmentDoc = gql`
    fragment SubscriptionContractProductMaterial on Material {
  materialId: id
  materialName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const AppSubscriptionContractFragmentDoc = gql`
    fragment AppSubscriptionContract on SubscriptionContract {
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
        ...SubscriptionContractProductProduct
        ...SubscriptionContractProductMaterial
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
${SubscriptionContractProductPlanFragmentDoc}
${SubscriptionContractProductProductFragmentDoc}
${SubscriptionContractProductMaterialFragmentDoc}`;
export const GetAppSubscriptionContractsDocument = gql`
    query GetAppSubscriptionContracts($where: WhereDataFindAllSubscriptionContractsInput, $orderBy: OrderByDataFindAllSubscriptionContractsInput, $page: PaginationInput) {
  subscriptionContracts(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AppSubscriptionContract
    }
  }
}
    ${AppSubscriptionContractFragmentDoc}`;

export function useGetAppSubscriptionContractsQuery(options?: Omit<Urql.UseQueryArgs<GetAppSubscriptionContractsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAppSubscriptionContractsQuery, GetAppSubscriptionContractsQueryVariables>({ query: GetAppSubscriptionContractsDocument, ...options });
};