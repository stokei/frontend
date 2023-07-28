import * as Types from '../../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { ProductPageFeatureFragmentDoc } from './features.query.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProductPageRemoveFeatureMutationVariables = Types.Exact<{
  input: Types.RemoveFeatureInput;
}>;


export type ProductPageRemoveFeatureMutation = { __typename?: 'Mutation', removeFeature: { __typename?: 'Feature', id: string, name: string, description?: string | null } };


export const ProductPageRemoveFeatureDocument = gql`
    mutation ProductPageRemoveFeature($input: RemoveFeatureInput!) {
  removeFeature(input: $input) {
    ...ProductPageFeature
  }
}
    ${ProductPageFeatureFragmentDoc}`;

export function useProductPageRemoveFeatureMutation() {
  return Urql.useMutation<ProductPageRemoveFeatureMutation, ProductPageRemoveFeatureMutationVariables>(ProductPageRemoveFeatureDocument);
};