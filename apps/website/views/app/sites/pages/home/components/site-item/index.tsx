import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import { Card, CardBody, Image, Link, Stack, Title } from "@stokei/ui";
import NextLink from "next/link";

import { websiteRoutes } from "@stokei/routes";
import { SitesHomePageSiteFragment } from "../../graphql/sites.query.graphql.generated";

export interface SiteItemProps {
  readonly site: SitesHomePageSiteFragment;
}

export const SiteItem = ({ site }: SiteItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const editSiteURL = websiteRoutes
    .app({ appId: currentApp?.id })
    .site({ site: site?.id }).home;

  return (
    <Link width="full" as={NextLink} href={editSiteURL}>
      <Card width="full" background="background.50">
        <CardBody>
          <Stack direction="row" spacing="5" align="center">
            <Image
              width="20"
              src={site?.logo?.file?.url || ""}
              fallbackSrc={defaultNoImage.src}
              alt={translate.formatMessage({ id: "site" })}
            />
            <Title fontSize="medium">{site?.name}</Title>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};
