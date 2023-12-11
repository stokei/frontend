import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { PriceComponentFragmentDoc } from '../../../../../../components/price/price.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminProductPageProductsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllProductsInput>;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllProductsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminProductPageProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', totalCount: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, nextPage: number, previousPage: number, items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null }> | null } };

export type AdminProductPageProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, defaultPrice?: { __typename?: 'Price', id: string, parent: string, type: Types.PriceType, nickname?: string | null, fromAmount?: number | null, amount?: number | null, discountPercent?: number | null, unit?: string | null, active: boolean, automaticRenew: boolean, isDefault: boolean, billingScheme?: Types.BillingScheme | null, tiersMode?: Types.TiersMode | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, tiers?: { __typename?: 'PriceTiers', items?: Array<{ __typename?: 'PriceTier', id: string, amount: number, upTo?: number | null, infinite: boolean }> | null } | null, recurring?: { __typename?: 'Recurring', usageType?: Types.UsageType | null, intervalCount: number, interval?: Types.IntervalType | null } | null } | null, parent?: { __typename: 'App' } | { __typename: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null } | { __typename: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null };

export type AdminProductPageProductCourseFragment = { __typename?: 'Course', courseId: string, courseName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, instructors?: { __typename?: 'CourseInstructors', items?: Array<{ __typename?: 'CourseInstructor', id: string, instructor: { __typename?: 'Account', fullname: string } }> | null } | null };

export type AdminProductPageProductMaterialFragment = { __typename?: 'Material', materialId: string, materialName: string, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminProductPageProductCourseFragmentDoc = gql`
    fragment AdminProductPageProductCourse on Course {
  courseId: id
  courseName: name
  avatar {
    file {
      url
    }
  }
  instructors {
    items {
      id
      instructor {
        fullname
      }
    }
  }
}
    `;
export const AdminProductPageProductMaterialFragmentDoc = gql`
    fragment AdminProductPageProductMaterial on Material {
  materialId: id
  materialName: name
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminProductPageProductFragmentDoc = gql`
    fragment AdminProductPageProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  defaultPrice {
    ...PriceComponent
  }
  parent {
    __typename
    ...AdminProductPageProductCourse
    ...AdminProductPageProductMaterial
  }
}
    ${PriceComponentFragmentDoc}
${AdminProductPageProductCourseFragmentDoc}
${AdminProductPageProductMaterialFragmentDoc}`;
export const GetAdminProductPageProductsDocument = gql`
    query GetAdminProductPageProducts($where: WhereDataFindAllProductsInput, $orderBy: OrderByDataFindAllProductsInput, $page: PaginationInput) {
  products(where: $where, page: $page, orderBy: $orderBy) {
    totalCount
    totalPages
    hasNextPage
    hasPreviousPage
    nextPage
    previousPage
    items {
      ...AdminProductPageProduct
    }
  }
}
    ${AdminProductPageProductFragmentDoc}`;

export function useGetAdminProductPageProductsQuery(options?: Omit<Urql.UseQueryArgs<GetAdminProductPageProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminProductPageProductsQuery, GetAdminProductPageProductsQueryVariables>({ query: GetAdminProductPageProductsDocument, ...options });
};