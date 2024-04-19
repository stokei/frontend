import { SelectItem } from "@stokei/ui";

import { PageSelectItemContent } from "../page-select-item-content";
import { SitePageFragment } from "../graphql/pages.query.graphql.generated";

interface PageSelectItemProps {
  readonly page?: SitePageFragment;
}

export const PageSelectItem = ({ page }: PageSelectItemProps) => {
  return (
    <SelectItem value={page}>
      <PageSelectItemContent page={page} />
    </SelectItem>
  );
};

PageSelectItem.displayName = "PageSelectItem";
