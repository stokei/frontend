import { SitePageFragment } from "../graphql/pages.query.graphql.generated";
import { Stack, Text } from "@stokei/ui";

interface PageSelectItemContentProps {
  readonly page?: SitePageFragment;
}

export const PageSelectItemContent = ({
  page,
}: PageSelectItemContentProps) => {
  return (
    <Stack direction="row" spacing="2" align="center">
      <Text>{page?.title}</Text>
    </Stack>
  );
};
