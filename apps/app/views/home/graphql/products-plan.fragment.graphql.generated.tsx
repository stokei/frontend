import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type HomeProductsPlanFragment = { __typename?: 'Plan', id: string, name: string, features?: { __typename?: 'Features', items?: Array<{ __typename?: 'Feature', id: string, name: string, description?: string | null }> | null } | null };

export const HomeProductsPlanFragmentDoc = gql`
    fragment HomeProductsPlan on Plan {
  id
  name
  features {
    items {
      id
      name
      description
    }
  }
}
    `;