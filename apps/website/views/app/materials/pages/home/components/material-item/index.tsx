import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Title
} from "@stokei/ui";
import NextLink from "next/link";

import { websiteRoutes } from "@stokei/routes";
import { AppMaterialFragment } from "../../graphql/materials.query.graphql.generated";

export interface MaterialItemProps {
  readonly material: AppMaterialFragment;
}

export const MaterialItem = ({ material }: MaterialItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <Link
      width="full"
      as={NextLink}
      href={
        websiteRoutes
          .app({ appId: currentApp?.id })
          .material({ material: material?.id }).home
      }
    >
      <Card background="background.50" overflow="hidden">
        <CardHeader position="relative" padding="0">
          <Image
            width="full"
            src={material?.avatar?.file?.url || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "material" })}
          />
        </CardHeader>
        <CardBody>
          <Title size="md">
            {material?.name}
          </Title>
        </CardBody>
      </Card>
    </Link>
  );
};
