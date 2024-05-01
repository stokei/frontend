import { Stack } from "@stokei/ui";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";
import { PageItem } from "../page-item";

interface PagesListProps {
  pages: SitePagesPageFragment[];
}

export const PagesList = ({ pages }: PagesListProps) => {
  return (
    <Stack direction="column" spacing="5">
      {pages?.map((page) => <PageItem key={page?.id} page={page} />)}
    </Stack>
  );
};
