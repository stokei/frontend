import defaultNoImage from "@/assets/no-image.png";
import { useCurrentApp, useTranslations } from "@/hooks";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Stack,
  Title,
} from "@stokei/ui";
import { memo } from "react";

import { routes } from "@/routes";
import { useRouter } from "next/router";
import { CourseMaterialFragment } from "../../graphql/materials.query.graphql.generated";

export interface MaterialItemProps {
  readonly material: CourseMaterialFragment;
}

export const MaterialItem = memo(({ material }: MaterialItemProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  const courseId = router?.query?.courseId?.toString() || "";

  const goToEditMaterial = () =>
    router.push(
      routes
        .app({ appId: currentApp?.id })
        .course({ course: courseId })
        .material({ material: material?.id }).home
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
