import { memo } from "react";

import { Catalog } from "../catalog";
import { CatalogItem } from "../catalog-item";
import { SortedItemComponentFragment } from "./graphql/sorted-item.fragment.graphql.generated";
import { HeroType } from "@/services/graphql/stokei";
import {
  HeroWithImage,
  HeroWithBackgroundImage,
  HeroWithVideo,
  HeroWithTitle,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { routes } from "@/routes";

export interface SortedItemFactoryProps {
  readonly sortedItem?: SortedItemComponentFragment | null;
}

export const SortedItemFactory = memo(
  ({ sortedItem, ...props }: SortedItemFactoryProps) => {
    const router = useRouter();
    const type = sortedItem?.item?.__typename;
    const goToSignUp = () => router.push(routes.auth.signUp);

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
            onCTA={goToSignUp}
            {...props}
          />
        ),
        [HeroType.WithImageBackground]: (
          <HeroWithBackgroundImage
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            imageURL={sortedItem?.item?.backgroundImage?.file?.url || ""}
            onCTA={goToSignUp}
            {...props}
          />
        ),
        [HeroType.WithVideo]: (
          <HeroWithVideo
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            videoURL={sortedItem?.item?.video?.file?.url || ""}
            videoFilename={sortedItem?.item?.video?.file?.filename || ""}
            onCTA={goToSignUp}
            {...props}
          />
        ),
        [HeroType.Default]: (
          <HeroWithTitle
            title={sortedItem?.item?.heroTitle}
            subtitle={sortedItem?.item?.heroSubtitle}
            titleHighlight={sortedItem?.item?.titleHighlight}
            onCTA={goToSignUp}
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
