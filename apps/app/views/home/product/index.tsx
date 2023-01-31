import { Card, CardBody, Description, Image, Stack, Title } from "@stokei/ui";
import { FC, memo } from "react";

import defaultLogoURL from "@/assets/logo.png";

export interface ProductPrice {
  readonly amount: number;
}

export interface ProductProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
  readonly prices?: ProductPrice[];
}

export const Product: FC<ProductProps> = memo(
  ({ id, name, description, avatar }) => {
    return (
      <Card background="background.50" overflow="hidden">
        <Image
          width="full"
          height="fit-content"
          src={avatar}
          fallbackSrc={defaultLogoURL.src}
        />
        <CardBody>
          <Stack spacing="3">
            <Title size="md">{name}</Title>
            {description && <Description>{description}</Description>}
          </Stack>
        </CardBody>
      </Card>
    );
  }
);
