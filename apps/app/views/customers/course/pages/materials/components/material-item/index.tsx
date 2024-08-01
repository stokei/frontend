import defaultNoImage from "@/assets/no-image.png";
import { useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Title
} from "@stokei/ui";
import NextLink from "next/link";

import { appRoutes } from "@stokei/routes";
import { useRouter } from "next/router";
import { CourseMaterialFragment } from "../../graphql/materials.query.graphql.generated";

export interface MaterialItemProps {
  readonly material: CourseMaterialFragment;
}

export const MaterialItem = ({ material }: MaterialItemProps) => {
  const router = useRouter();
  const translate = useTranslations();

  const courseId = router?.query?.courseId?.toString() || "";

  return (
    <Link
      as={NextLink}
      width="full"
      height="full"
      href={appRoutes.customers
        .course({ course: courseId })
        .materials.view({ material: material?.id }).home}
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
          <Title size="md" marginBottom="5">
            {material?.name}
          </Title>
        </CardBody>
      </Card>
    </Link>
  );
};
