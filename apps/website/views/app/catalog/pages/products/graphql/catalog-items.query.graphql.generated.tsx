import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCatalogPageCatalogItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllCatalogItemsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCatalogPageCatalogItemsQuery = { __typename?: 'Query', catalogItems: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, parent?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null } }> | null } };

export type AdminCatalogPageItemFragment = { __typename?: 'CatalogItem', id: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, parent?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null } };

export type AdminCatalogPageItemProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, parent?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | null };

export type AdminCatalogPageItemProductAppFragment = { __typename?: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type AdminCatalogPageItemProductCourseFragment = { __typename?: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type AdminCatalogPageItemProductMaterialFragment = { __typename?: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminCatalogPageItemProductCourseFragmentDoc = gql`
    fragment AdminCatalogPageItemProductCourse on Course {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageItemProductMaterialFragmentDoc = gql`
    fragment AdminCatalogPageItemProductMaterial on Material {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageItemProductAppFragmentDoc = gql`
    fragment AdminCatalogPageItemProductApp on App {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageItemProductFragmentDoc = gql`
    fragment AdminCatalogPageItemProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  parent {
    __typename
    ...AdminCatalogPageItemProductCourse
    ...AdminCatalogPageItemProductMaterial
    ...AdminCatalogPageItemProductApp
  }
}
    ${AdminCatalogPageItemProductCourseFragmentDoc}
${AdminCatalogPageItemProductMaterialFragmentDoc}
${AdminCatalogPageItemProductAppFragmentDoc}`;
export const AdminCatalogPageItemFragmentDoc = gql`
    fragment AdminCatalogPageItem on CatalogItem {
  id
  product {
    ...AdminCatalogPageItemProduct
  }
}
    ${AdminCatalogPageItemProductFragmentDoc}`;
export const GetAdminCatalogPageCatalogItemsDocument = gql`
    query GetAdminCatalogPageCatalogItems($where: WhereDataFindAllCatalogItemsInput!, $orderBy: OrderByDataFindAllCatalogItemsInput, $page: PaginationInput) {
  catalogItems(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    items {
      ...AdminCatalogPageItem
    }
  }
}
    ${AdminCatalogPageItemFragmentDoc}`;

export function useGetAdminCatalogPageCatalogItemsQuery(options: Omit<Urql.UseQueryArgs<GetAdminCatalogPageCatalogItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCatalogPageCatalogItemsQuery, GetAdminCatalogPageCatalogItemsQueryVariables>({ query: GetAdminCatalogPageCatalogItemsDocument, ...options });
};