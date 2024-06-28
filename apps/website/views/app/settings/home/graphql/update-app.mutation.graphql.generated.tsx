import * as Types from '../../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAppMutationVariables = Types.Exact<{
  input: Types.UpdateAppInput;
}>;


export type UpdateAppMutation = { __typename?: 'Mutation', updateApp: { __typename?: 'App', id: string, name: string, slug: string, isStokei: boolean, stripeAccount?: string | null, currency: { __typename?: 'Currency', id: string, symbol: string, minorUnit: number }, icon?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, logo?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, colors?: { __typename?: 'Colors', items?: Array<{ __typename?: 'Color', color: string, themeMode: Types.ThemeMode, type: Types.ColorType }> | null } | null } };


export const UpdateAppDocument = gql`
    mutation UpdateApp($input: UpdateAppInput!) {
  updateApp(input: $input) {
    id
    name
    slug
    isStokei
    stripeAccount
    currency {
      id
      symbol
      minorUnit
    }
    icon {
      file {
        url
      }
    }
    logo {
      file {
        url
      }
    }
    colors {
      items {
        color
        themeMode
        type
      }
    }
  }
}
    `;

export function useUpdateAppMutation() {
  return Urql.useMutation<UpdateAppMutation, UpdateAppMutationVariables>(UpdateAppDocument);
};