import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo } from "react";

import { routes } from "@/routes";
import { AppMaterialFragment } from "../../graphql/materials.query.graphql.generated";
import { useRouter } from "next/router";

export interface MaterialItemProps {
  readonly material: AppMaterialFragment;
}

export const MaterialItem: FC<MaterialItemProps> = memo(({ material }) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const goToEditMaterial = () =>
    router.push(
      routes.app({ appId: currentApp?.id }).material({ material: material?.id })
        .home
    );

  return (
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
        <Stack direction="column" spacing="5">
          <Title size="md" marginBottom="5">
            {material?.name}
          </Title>
          <Button onClick={goToEditMaterial}>
            {translate.formatMessage({ id: "view" })}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
});

MaterialItem.displayName = "MaterialItem";
