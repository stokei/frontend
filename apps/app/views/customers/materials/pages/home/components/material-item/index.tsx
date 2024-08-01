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
import { AppSubscriptionContractsByItemMaterialProductMaterialFragment } from "../../../../graphql/subscription-contracts.query.graphql.generated";

export interface MaterialItemProps {
  readonly material: AppSubscriptionContractsByItemMaterialProductMaterialFragment;
}

export const MaterialItem = ({ material }: MaterialItemProps) => {
  const translate = useTranslations();

  return (
    <Link
      as={NextLink}
      width="full"
      height="full"
      href={appRoutes.customers.material({ material: material?.id })}
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
