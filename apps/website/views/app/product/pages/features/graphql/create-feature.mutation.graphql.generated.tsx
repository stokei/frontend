import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { ProductPageFeatureFragmentDoc } from './features.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProductPageCreateFeatureMutationVariables = Types.Exact<{
  input: Types.CreateFeatureInput;
}>;


export type ProductPageCreateFeatureMutation = { __typename?: 'Mutation', createFeature: { __typename?: 'Feature', id: string, name: string, description?: string | null } };


export const ProductPageCreateFeatureDocument = gql`
    mutation ProductPageCreateFeature($input: CreateFeatureInput!) {
  createFeature(input: $input) {
    ...ProductPageFeature
  }
}
    ${ProductPageFeatureFragmentDoc}`;

export function useProductPageCreateFeatureMutation() {
  return Urql.useMutation<ProductPageCreateFeatureMutation, ProductPageCreateFeatureMutationVariables>(ProductPageCreateFeatureDocument);
};