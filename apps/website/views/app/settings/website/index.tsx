import { SortedItemFactoryEdit } from "@/components/sorted-item-factory-edit";
import { useCurrentApp } from "@/hooks";
import { AppLayout } from "@/views/app/layout";
import { Card, CardBody, Container, Loading, Stack } from "@stokei/ui";
import { useMemo } from "react";
import { Navbar } from "./components/navbar";
import { useSortedItemsQuery } from "./graphql/sorted-items.query.graphql.generated";

export const WebsitePage = () => {
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
    <AppLayout>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Stack direction="column" paddingY="5" spacing="5">
          {sortedItems?.items?.map((sortedItem) => (
            <Container key={sortedItem?.id}>
              <Card background="background.50">
                <CardBody>
                  <SortedItemFactoryEdit sortedItem={sortedItem} />
                </CardBody>
              </Card>
            </Container>
          ))}
        </Stack>
      )}
    </AppLayout>
  );
};
