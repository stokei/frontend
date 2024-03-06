import { SortedItemFactory } from "@/components";
import { useCurrentApp } from "@/hooks";
import { FC, useMemo } from "react";
import { useSortedItemsQuery } from "./graphql/sorted-items.query.graphql.generated";
import { LandingPageLayout } from "./layout";
import { Loading } from "./loading";

interface LandingPageProps {}

export const LandingPage: FC<LandingPageProps> = () => {
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
    () => dataSortedItems?.sortedItems?.items || [],
    [dataSortedItems]
  );

  return (
    <LandingPageLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {sortedItems?.map((sortedItem) => (
            <SortedItemFactory key={sortedItem?.id} sortedItem={sortedItem} />
          ))}
        </>
      )}
    </LandingPageLayout>
  );
};
