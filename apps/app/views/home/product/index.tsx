import { Card, CardBody, Image, Title } from "@stokei/ui";
import { FC, memo } from "react";

import defaultLogoURL from "@/assets/logo.png";

export interface ProductProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
}

export const Product: FC<ProductProps> = memo(({ id, name, avatar }) => {
  return (
    <Card background="background.50">
      <Image
        width="full"
        height="fit-content"
        src={avatar}
        fallbackSrc={defaultLogoURL.src}
      />
      <CardBody>
        <Title size="md">{name}</Title>
      </CardBody>
    </Card>
  );
});
