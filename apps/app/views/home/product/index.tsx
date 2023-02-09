import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Description,
  Image,
  Stack,
  Title,
} from "@stokei/ui";
import { FC, memo, useCallback, useMemo } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { PriceFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { useRouter } from "next/router";
import { HomeProductsCourseFragment } from "./products-course.fragment.graphql.generated";
import { HomeProductsPlanFragment } from "./products-plan.fragment.graphql.generated";

export interface ProductProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
  readonly plan?: HomeProductsPlanFragment | null;
  readonly course?: HomeProductsCourseFragment | null;
  readonly defaultPrice?: PriceFragment | null;
}

export const Product: FC<ProductProps> = memo(
  ({
    id: productId,
    name,
    description,
    avatar,
    defaultPrice,
    course,
    plan,
  }) => {
    const router = useRouter();
    const translate = useTranslations();

    const productURL = useMemo(() => {
      if (!!course) {
        return getRoutes().course.home({ product: productId || "" });
      }
      return getRoutes().plan.home({ product: productId || "" });
    }, [productId, course]);

    const goToCheckout = useCallback(() => {
      router.push(productURL);
    }, [productURL, router]);

    return (
      <Card background="background.50" overflow="hidden">
        <CardHeader position="relative" padding="0">
          <Image
            width="full"
            height="fit-content"
            src={avatar}
            fallbackSrc={defaultNoImage.src}
          />
          {defaultPrice?.discountPercent && (
            <Box
              position="absolute"
              transform="rotate(45deg)"
              right="-7"
              top="3"
            >
              <Badge variant="solid" width="24">
                {defaultPrice?.discountPercent}% OFF
              </Badge>
            </Box>
          )}
        </CardHeader>
        <CardBody>
          <Box width="full" flexDirection="column" height="full">
            <Title size="md" marginBottom="5">
              {name}
            </Title>
            <Box width="full" flexDirection="column" flex="1">
              <Stack spacing="3" flex="1">
                {!!course?.instructors?.items?.length && (
                  <Description>
                    {course?.instructors?.items
                      ?.map((instructor) => instructor.instructor?.fullname)
                      .join(", ")}
                  </Description>
                )}
              </Stack>
              <Box marginBottom="5">
                {defaultPrice && <Price price={defaultPrice} />}
              </Box>
              <Button width="full" onClick={goToCheckout}>
                {translate.formatMessage({ id: "buyNow" })}
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>
    );
  }
);
