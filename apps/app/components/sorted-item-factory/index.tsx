import { FC, memo } from "react";

import { Catalog } from "../catalog";
import { HeroWithImage } from "../hero-with-image";
import { HeroWithTitle } from "../hero-with-title";
import { HeroWithVideo } from "../hero-with-video";
import { SortedItemComponentFragment } from "./sorted-item.query.graphql.generated";

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

    if (type === "Hero") {
      if (sortedItem?.item?.image) {
        return (
          <HeroWithImage
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            imageURL={sortedItem?.item?.image?.file?.url || ""}
            {...props}
          />
        );
      }
      if (sortedItem?.item?.video) {
        return (
          <HeroWithVideo
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            videoURL={sortedItem?.item?.video?.file?.url || ""}
            {...props}
          />
        );
      }
      if (sortedItem?.item?.heroTitle || sortedItem?.item?.heroSubtitle) {
        return (
          <HeroWithTitle
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            {...props}
          />
        );
      }
    }

    return <></>;
  }
);
