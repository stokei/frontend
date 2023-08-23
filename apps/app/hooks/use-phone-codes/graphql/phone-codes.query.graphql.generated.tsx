import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PhoneCodesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PhoneCodesQuery = { __typename?: 'Query', phoneCodes: Array<{ __typename?: 'PhoneCode', country: string, code: string }> };


export const PhoneCodesDocument = gql`
    query PhoneCodes {
  phoneCodes {
    country
    code
  }
}
    `;

export function usePhoneCodesQuery(options?: Omit<Urql.UseQueryArgs<PhoneCodesQueryVariables>, 'query'>) {
  return Urql.useQuery<PhoneCodesQuery, PhoneCodesQueryVariables>({ query: PhoneCodesDocument, ...options });
};