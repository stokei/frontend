import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetAdminCatalogPageCatalogItemsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllCatalogItemsInput;
  orderBy?: Types.InputMaybe<Types.OrderByDataFindAllCatalogItemsInput>;
  page?: Types.InputMaybe<Types.PaginationInput>;
}>;


export type GetAdminCatalogPageCatalogItemsQuery = { __typename?: 'Query', catalogItems: { __typename?: 'CatalogItems', totalCount: number, items?: Array<{ __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, externalReference?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null } }> | null } };

export type AdminCatalogPageCatalogItemFragment = { __typename?: 'CatalogItem', id: string, catalog: string, product: { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, externalReference?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null } };

export type AdminCatalogPageCatalogItemProductFragment = { __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, externalReference?: { __typename: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | { __typename: 'Plan' } | { __typename: 'Product' } | null };

export type AdminCatalogPageCatalogItemProductAppFragment = { __typename?: 'App', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type AdminCatalogPageCatalogItemProductCourseFragment = { __typename?: 'Course', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type AdminCatalogPageCatalogItemProductMaterialFragment = { __typename?: 'Material', avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export const AdminCatalogPageCatalogItemProductCourseFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItemProductCourse on Course {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageCatalogItemProductMaterialFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItemProductMaterial on Material {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageCatalogItemProductAppFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItemProductApp on App {
  avatar {
    file {
      url
    }
  }
}
    `;
export const AdminCatalogPageCatalogItemProductFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItemProduct on Product {
  id
  name
  description
  avatar {
    file {
      url
    }
  }
  externalReference {
    __typename
    ...AdminCatalogPageCatalogItemProductCourse
    ...AdminCatalogPageCatalogItemProductMaterial
    ...AdminCatalogPageCatalogItemProductApp
  }
}
    ${AdminCatalogPageCatalogItemProductCourseFragmentDoc}
${AdminCatalogPageCatalogItemProductMaterialFragmentDoc}
${AdminCatalogPageCatalogItemProductAppFragmentDoc}`;
export const AdminCatalogPageCatalogItemFragmentDoc = gql`
    fragment AdminCatalogPageCatalogItem on CatalogItem {
  id
  catalog
  product {
    ...AdminCatalogPageCatalogItemProduct
  }
}
    ${AdminCatalogPageCatalogItemProductFragmentDoc}`;
export const GetAdminCatalogPageCatalogItemsDocument = gql`
    query GetAdminCatalogPageCatalogItems($where: WhereDataFindAllCatalogItemsInput!, $orderBy: OrderByDataFindAllCatalogItemsInput, $page: PaginationInput) {
  catalogItems(where: $where, orderBy: $orderBy, page: $page) {
    totalCount
    items {
      ...AdminCatalogPageCatalogItem
    }
  }
}
    ${AdminCatalogPageCatalogItemFragmentDoc}`;

export function useGetAdminCatalogPageCatalogItemsQuery(options: Omit<Urql.UseQueryArgs<GetAdminCatalogPageCatalogItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAdminCatalogPageCatalogItemsQuery, GetAdminCatalogPageCatalogItemsQueryVariables>({ query: GetAdminCatalogPageCatalogItemsDocument, ...options });
};