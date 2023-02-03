import {
  Box,
  Button,
  Card,
  CardBody,
  Description,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo, useCallback, useMemo } from "react";

import defaultLogoURL from "@/assets/logo.png";
import { Price } from "@/components/price";
import { PriceFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { useRouter } from "next/router";

export interface ProductProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
  readonly defaultPrice?: PriceFragment | null;
  readonly prices?: PriceFragment[] | null;
}

export const Product: FC<ProductProps> = memo(
  ({ id: productId, name, description, avatar, prices, defaultPrice }) => {
    const translate = useTranslations();
    const router = useRouter();

    const price = useMemo(
      () => defaultPrice || prices?.[0],
      [defaultPrice, prices]
    );

    const checkoutURL = useMemo(
      () => getRoutes().checkout.home({ price: price?.id || "" }),
      [price]
    );

    const goToCheckout = useCallback(() => {
      router.push(checkoutURL);
    }, [checkoutURL, router]);

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
            <NextLink href={checkoutURL}>
              <Link>
                <Title size="md">{name}</Title>
              </Link>
            </NextLink>
            {description && <Description>{description}</Description>}
            {price && <Price price={price} />}
            <Box width="full" justify="space-between">
              <Box />
              <Button onClick={goToCheckout}>
                {translate.formatMessage({ id: "subscribe" })}
              </Button>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  }
);
