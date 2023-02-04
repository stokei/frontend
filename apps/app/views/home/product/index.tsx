import {
  Badge,
  Box,
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

    const checkoutURL = useMemo(
      () => getRoutes().checkout.home({ price: defaultPrice?.id || "" }),
      [defaultPrice]
    );

    const goToCheckout = useCallback(() => {
      router.push(checkoutURL);
    }, [checkoutURL, router]);

    return (
      <Card
        background="background.50"
        overflow="hidden"
        onClick={goToCheckout}
        _hover={{
          cursor: "pointer",
          boxShadow: "md",
        }}
      >
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
          <Title size="md" marginBottom="5">
            {name}
          </Title>
          <Stack spacing="3">
            {!!course?.instructors?.items?.length && (
              <Description>
                {course?.instructors?.items
                  ?.map((instructor) => instructor.instructor?.fullname)
                  .join(", ")}
              </Description>
            )}
            {defaultPrice && <Price price={defaultPrice} />}
          </Stack>
        </CardBody>
      </Card>
    );
  }
);
