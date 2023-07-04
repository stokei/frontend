import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditHeroDefaultFormUpdateHeroMutationVariables = Types.Exact<{
  input: Types.UpdateHeroInput;
}>;


export type EditHeroDefaultFormUpdateHeroMutation = { __typename?: 'Mutation', updateHero: { __typename?: 'Hero', id: string, title?: string | null, subtitle?: string | null } };


export const EditHeroDefaultFormUpdateHeroDocument = gql`
    mutation EditHeroDefaultFormUpdateHero($input: UpdateHeroInput!) {
  updateHero(input: $input) {
    id
    title
    subtitle
  }
}
    `;

export function useEditHeroDefaultFormUpdateHeroMutation() {
  return Urql.useMutation<EditHeroDefaultFormUpdateHeroMutation, EditHeroDefaultFormUpdateHeroMutationVariables>(EditHeroDefaultFormUpdateHeroDocument);
};