import { SortedItemFactory } from "@/components";
import { useCurrentApp, useTranslations } from "@/hooks";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useSortedItemsQuery } from "./graphql/sorted-items.query.graphql.generated";
import { LandingPageLayout } from "./layout";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading, data: dataSortedItems }] = useSortedItemsQuery({
    pause: !currentApp?.id,
    variables: {
      where: {
        AND: {
          parent: {
            equals: currentApp?.id,
          },
        },
      },
    },
  });

  const sortedItems = useMemo(
    () => dataSortedItems?.sortedItems,
    [dataSortedItems]
  );

  return (
    <LandingPageLayout>
      {sortedItems?.items?.map((sortedItem) => (
        <SortedItemFactory sortedItem={sortedItem} />
      ))}
    </LandingPageLayout>
  );
};
