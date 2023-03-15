import * as Types from '../../services/graphql/stokei/index';

import gql from 'graphql-tag';
export type SortedItemComponentFragment = { __typename?: 'SortedItem', id: string, parent?: string | null, index?: number | null, item?: { __typename: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null } | { __typename: 'CatalogItem' } | { __typename: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null } | null };

export type SortedItemComponentHeroFragment = { __typename?: 'Hero', titleHighlight?: string | null, heroId: string, heroTitle?: string | null, heroSubtitle?: string | null, video?: { __typename?: 'Video', file?: { __typename?: 'File', url?: string | null } | null } | null, image?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null, backgroundImage?: { __typename?: 'Image', file: { __typename?: 'File', url?: string | null } } | null };

export type SortedItemComponentCatalogFragment = { __typename?: 'Catalog', catalogId: string, catalogTitle: string, catalogSubtitle?: string | null };

export const SortedItemComponentHeroFragmentDoc = gql`
    fragment SortedItemComponentHero on Hero {
  heroId: id
  heroTitle: title
  titleHighlight
  heroSubtitle: subtitle
  video {
    file {
      url
    }
  }
  image {
    file {
      url
    }
  }
  backgroundImage {
    file {
      url
    }
  }
}
    `;
export const SortedItemComponentCatalogFragmentDoc = gql`
    fragment SortedItemComponentCatalog on Catalog {
  catalogId: id
  catalogTitle: title
  catalogSubtitle: subtitle
}
    `;
export const SortedItemComponentFragmentDoc = gql`
    fragment SortedItemComponent on SortedItem {
  id
  parent
  index
  item {
    __typename
    ...SortedItemComponentHero
    ...SortedItemComponentCatalog
  }
}
    ${SortedItemComponentHeroFragmentDoc}
${SortedItemComponentCatalogFragmentDoc}`;