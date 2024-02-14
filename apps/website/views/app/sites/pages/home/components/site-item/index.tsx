import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { Card, CardBody, CardHeader, Image, Link, Title } from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo } from "react";

import { routes } from "@/routes";
import { SitesHomePageSiteFragment } from "../../graphql/sites.query.graphql.generated";

export interface SiteItemProps {
  readonly site: SitesHomePageSiteFragment;
}

export const SiteItem: FC<SiteItemProps> = memo(({ site }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const editSiteURL = routes
    .app({ appId: currentApp?.id })
    .site({ site: site?.id }).home;

  return (
    <Link width="full" as={NextLink} href={editSiteURL}>
      <Card background="background.50" overflow="hidden">
        <CardHeader position="relative" padding="0">
          <Image
            width="full"
            src={site?.logo?.file?.url || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "course" })}
          />
        </CardHeader>
        <CardBody>
          <Title size="md" marginBottom="5">
            {site?.name}
          </Title>
        </CardBody>
      </Card>
    </Link>
  );
});

SiteItem.displayName = "SiteItem";
