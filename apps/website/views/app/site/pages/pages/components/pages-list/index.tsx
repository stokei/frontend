import { SimpleGrid } from "@stokei/ui";
import { FC } from "react";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";
import { PageItem } from "../page-item";

interface PagesListProps {
  readonly pages?: SitePagesPageFragment[];
}

export const PagesList: FC<PagesListProps> = ({ pages }) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {pages?.map((page) => (
        <PageItem key={page?.id} page={page} />
      ))}
    </SimpleGrid>
  );
};
