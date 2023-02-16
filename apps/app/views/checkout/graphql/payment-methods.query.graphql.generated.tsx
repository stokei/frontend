import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import { CheckoutPaymentMethodFragmentDoc } from './payment-method.fragment.graphql.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPaymentMethodsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WhereDataFindAllPaymentMethodsInput>;
}>;


export type GetPaymentMethodsQuery = { __typename?: 'Query', paymentMethods: { __typename?: 'PaymentMethods', items?: Array<{ __typename?: 'PaymentMethod', id: string, parent: string, cardBrand?: string | null, cardExpiryMonth?: string | null, cardExpiryYear?: string | null, lastFourCardNumber?: string | null, stripePaymentMethod?: string | null }> | null } };


export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods($where: WhereDataFindAllPaymentMethodsInput) {
  paymentMethods(where: $where) {
    items {
      ...CheckoutPaymentMethod
    }
  }
}
    ${CheckoutPaymentMethodFragmentDoc}`;

export function useGetPaymentMethodsQuery(options?: Omit<Urql.UseQueryArgs<GetPaymentMethodsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>({ query: GetPaymentMethodsDocument, ...options });
};