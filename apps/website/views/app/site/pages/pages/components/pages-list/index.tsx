import { SimpleGrid } from "@stokei/ui";

import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";
import { PageItem } from "../page-item";

interface PagesListProps {
  readonly pages?: SitePagesPageFragment[];
}

export const PagesList = ({ pages }: PagesListProps) => {
  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing="5">
      {pages?.map((page) => <PageItem key={page?.id} page={page} />)}
    </SimpleGrid>
  );
};
