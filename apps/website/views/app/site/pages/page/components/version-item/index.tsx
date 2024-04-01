import { usePage, useTranslations } from "@/hooks";
import { Badge, SidebarNavLink } from "@stokei/ui";

import { PageVersionFragment } from "../../graphql/versions.query.graphql.generated";

export interface VersionItemProps {
  readonly version: PageVersionFragment;
}

export const VersionItem = ({ version }: VersionItemProps) => {
  const { version: pageCurrentVersion } = usePage();
  const translate = useTranslations();

  return (
    <SidebarNavLink
      isTruncated
      badge={
        pageCurrentVersion?.id === version?.id ? (
          <Badge>{translate.formatMessage({ id: "active" })}</Badge>
        ) : undefined
      }
      onClick={(e) => e.preventDefault()}
    >
      {version?.name}
    </SidebarNavLink>
  );
};
