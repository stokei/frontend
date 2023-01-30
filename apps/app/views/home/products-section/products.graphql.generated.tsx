import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProductsQueryVariables = Types.Exact<{
  where: Types.WhereDataFindAllProductsInput;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'Products', items?: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, avatar?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null }> | null } };


export const ProductsDocument = gql`
    query Products($where: WhereDataFindAllProductsInput!) {
  products(where: $where) {
    items {
      id
      name
      description
      avatar {
        file {
          url
        }
      }
    }
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProductsQuery, ProductsQueryVariables>({ query: ProductsDocument, ...options });
};