import { useCurrentApp, usePage, useSite, useTranslations } from "@/hooks";
import { Badge, SidebarNavLink } from "@stokei/ui";

import { PageVersionFragment } from "../../graphql/versions.query.graphql.generated";
import { websiteRoutes } from "@stokei/routes";
import { useRouter } from "next/router";

export interface VersionItemProps {
  readonly version: PageVersionFragment;
}

export const VersionItem = ({ version }: VersionItemProps) => {
  const router = useRouter();
  const { page } = usePage();
  const { site } = useSite();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  const versionURL = websiteRoutes
    .app({ appId: currentApp?.id })
    .site({ site: site?.id || "" })
    .page({ page: page?.id || "", version: version?.id }).home;
  return (
    <SidebarNavLink
      href={versionURL}
      isTruncated
      isActive={router.asPath === versionURL}
      badge={
        page?.version?.id === version?.id ? (
          <Badge>{translate.formatMessage({ id: "active" })}</Badge>
        ) : undefined
      }
    >
      {version?.name}
    </SidebarNavLink>
  );
};
