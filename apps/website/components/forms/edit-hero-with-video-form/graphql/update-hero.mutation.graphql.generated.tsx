import * as Types from '../../../../services/graphql/stokei/index';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EditHeroWithVideoFormUpdateHeroMutationVariables = Types.Exact<{
  input: Types.UpdateHeroInput;
}>;


export type EditHeroWithVideoFormUpdateHeroMutation = { __typename?: 'Mutation', updateHero: { __typename?: 'Hero', id: string, title?: string | null, subtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null } };


export const EditHeroWithVideoFormUpdateHeroDocument = gql`
    mutation EditHeroWithVideoFormUpdateHero($input: UpdateHeroInput!) {
  updateHero(input: $input) {
    id
    title
    subtitle
    video {
      file {
        url
      }
    }
  }
}
    `;

export function useEditHeroWithVideoFormUpdateHeroMutation() {
  return Urql.useMutation<EditHeroWithVideoFormUpdateHeroMutation, EditHeroWithVideoFormUpdateHeroMutationVariables>(EditHeroWithVideoFormUpdateHeroDocument);
};