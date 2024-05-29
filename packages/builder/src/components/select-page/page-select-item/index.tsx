import { SingleSelectOption } from "@stokei/ui";

import { SitePageFragment } from "../graphql/pages.query.graphql.generated";
import { PageSelectItemContent } from "../page-select-item-content";

interface PageSelectItemProps {
  readonly page?: SitePageFragment;
}

export const PageSelectItem = ({ page }: PageSelectItemProps) => {
  return (
    <SingleSelectOption value={page}>
      <PageSelectItemContent page={page} />
    </SingleSelectOption>
  );
};

PageSelectItem.displayName = "PageSelectItem";
