import { FC, memo } from "react";

import { Catalog } from "../catalog";
import { CatalogItem } from "../catalog-item";
import { HeroWithImage } from "../hero-with-image";
import { HeroWithTitle } from "../hero-with-title";
import { HeroWithVideo } from "../hero-with-video";
import { SortedItemComponentFragment } from "./graphql/sorted-item.fragment.graphql.generated";
import { HeroType } from "@/services/graphql/stokei";
import { HeroWithBackgroundImage } from "../hero-with-background-image";

export interface SortedItemFactoryProps {
  readonly sortedItem?: SortedItemComponentFragment | null;
}

export const SortedItemFactory: FC<SortedItemFactoryProps> = memo(
  ({ sortedItem, ...props }) => {
    const type = sortedItem?.item?.__typename;

    if (type === "Catalog") {
      return (
        <Catalog
          catalogId={sortedItem?.item?.catalogId}
          title={sortedItem?.item?.catalogTitle}
          subtitle={sortedItem?.item?.catalogSubtitle}
          {...props}
        />
      );
    }

    if (type === "CatalogItem") {
      return (
        <CatalogItem
          productId={sortedItem?.item?.product?.id}
          name={sortedItem?.item?.product?.name}
          avatar={sortedItem?.item?.product?.avatar?.file?.url || ""}
          defaultPrice={sortedItem?.item?.product?.defaultPrice}
          parent={sortedItem?.item?.product?.parent}
          {...props}
        />
      );
    }

    if (type === "Hero") {
      const heros = {
        [HeroType.WithImage]: (
          <HeroWithImage
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            imageURL={sortedItem?.item?.image?.file?.url || ""}
            {...props}
          />
        ),
        [HeroType.WithImageBackground]: (
          <HeroWithBackgroundImage
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            imageURL={sortedItem?.item?.backgroundImage?.file?.url || ""}
            {...props}
          />
        ),
        [HeroType.WithVideo]: (
          <HeroWithVideo
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            videoURL={sortedItem?.item?.video?.file?.url || ""}
            {...props}
          />
        ),
        [HeroType.Default]: (
          <HeroWithTitle
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            {...props}
          />
        ),
      };
      return heros[sortedItem?.item?.heroType || HeroType.Default];
    }

    return <></>;
  }
);

SortedItemFactory.displayName = "SortedItemFactory";
