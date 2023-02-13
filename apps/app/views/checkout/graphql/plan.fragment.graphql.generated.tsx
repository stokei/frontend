import * as Types from '../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type CheckoutProductPlanFragment = { __typename?: 'Plan', id: string, name: string };

export const CheckoutProductPlanFragmentDoc = gql`
    fragment CheckoutProductPlan on Plan {
  id
  name
}
    `;