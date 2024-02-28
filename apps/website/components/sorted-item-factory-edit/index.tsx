import { HeroType } from "@/services/graphql/stokei";
import { Catalog } from "../catalog";
import { CatalogItem } from "../catalog-item";
import { EditHeroDefaultForm } from "../forms/edit-hero-default-form";
import { SortedItemComponentFragment } from "../sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";
import { EditCatalogForm } from "../forms/edit-catalog-form";
import { EditHeroWithVideoForm } from "../forms/edit-hero-with-video-form";

export interface SortedItemFactoryEditProps {
  readonly sortedItem?: SortedItemComponentFragment | null;
}

export const SortedItemFactoryEdit = ({
  sortedItem,
  ...props
}: SortedItemFactoryEditProps) => {
  const type = sortedItem?.item?.__typename;

  if (type === "Catalog") {
    return (
      <EditCatalogForm
        catalog={{
          id: sortedItem?.item?.catalogId || "",
          title: sortedItem?.item?.catalogTitle || "",
          subtitle: sortedItem?.item?.catalogSubtitle || "",
        }}
        {...props}
      />
    );
  }

  if (type === "Hero") {
    const heros = {
      [HeroType.WithImage]: <></>,
      [HeroType.WithImageBackground]: <></>,
      [HeroType.WithVideo]: (
        <EditHeroWithVideoForm
          hero={{
            id: sortedItem?.item?.heroId || "",
            title: sortedItem?.item?.heroTitle || "",
            subtitle: sortedItem?.item?.heroSubtitle || "",
            videoFile: sortedItem?.item?.video?.file
              ? {
                  filename: sortedItem?.item?.video?.file?.filename || "",
                  url: sortedItem?.item?.video?.file?.url || "",
                }
              : undefined,
          }}
          {...props}
        />
      ),
      [HeroType.Default]: (
        <EditHeroDefaultForm
          hero={{
            id: sortedItem?.item?.heroId || "",
            title: sortedItem?.item?.heroTitle || "",
            subtitle: sortedItem?.item?.heroSubtitle || "",
          }}
          {...props}
        />
      ),
    };
    return heros[sortedItem?.item?.heroType || HeroType.Default];
  }

  return <></>;
};
