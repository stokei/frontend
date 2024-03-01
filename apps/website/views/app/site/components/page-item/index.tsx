import { useCurrentApp, useSite, useTranslations } from "@/hooks";
import { Badge, SidebarNavLink } from "@stokei/ui";
import NextLink from "next/link";

import { routes } from "@/routes";
import { useRouter } from "next/router";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";

export interface PageItemProps {
  readonly page: SitePagesPageFragment;
}

export const PageItem = ({ page }: PageItemProps) => {
  const router = useRouter();
  const { site } = useSite();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();

  const editPageURL = routes
    .app({ appId: currentApp?.id })
    .site({ site: site?.id || "" })
    .page({ page: page?.id }).home;

  return (
    <SidebarNavLink
      as={NextLink}
      href={editPageURL}
      isTruncated
      badge={
        page?.id === site?.homePage?.id ? (
          <Badge>{translate.formatMessage({ id: "home" })}</Badge>
        ) : undefined
      }
      isActive={router.asPath === editPageURL}
    >
      {page?.title}
    </SidebarNavLink>
  );
};
