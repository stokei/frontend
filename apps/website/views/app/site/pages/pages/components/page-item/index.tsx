import { useCurrentApp, useSite } from "@/hooks";
import { Card, CardBody, Link, Title } from "@stokei/ui";
import NextLink from "next/link";
import { memo } from "react";

import { routes } from "@/routes";
import { SitePagesPageFragment } from "../../graphql/pages.query.graphql.generated";

export interface PageItemProps {
  readonly page: SitePagesPageFragment;
}

export const PageItem = memo(({ page }: PageItemProps) => {
  const { site } = useSite();
  const { currentApp } = useCurrentApp();

  const editPageURL = routes
    .app({ appId: currentApp?.id })
    .site({ site: site?.id || "" })
    .page({ page: page?.id }).home;

  return (
    <Link width="full" as={NextLink} href={editPageURL}>
      <Card background="background.50" overflow="hidden">
        <CardBody>
          <Title size="md" marginBottom="5">
            {page?.title}
          </Title>
        </CardBody>
      </Card>
    </Link>
  );
});

PageItem.displayName = "PageItem";
