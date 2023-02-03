import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Description,
  Image,
  Link,
  Stack,
  Title,
} from "@stokei/ui";
import NextLink from "next/link";
import { FC, memo, useCallback, useMemo } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { PriceFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { getRoutes } from "@/routes";
import { useRouter } from "next/router";
import { HomeProductsPlanFragment } from "./products-plan.fragment.graphql.generated";
import { HomeProductsCourseFragment } from "./products-course.fragment.graphql.generated";

export interface ProductProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
  readonly plan?: HomeProductsPlanFragment | null;
  readonly course?: HomeProductsCourseFragment | null;
  readonly defaultPrice?: PriceFragment | null;
  readonly prices?: PriceFragment[] | null;
}

export const Product: FC<ProductProps> = memo(
  ({
    id: productId,
    name,
    description,
    avatar,
    prices,
    defaultPrice,
    course,
    plan,
  }) => {
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
      <Card
        background="background.50"
        overflow="hidden"
        onClick={goToCheckout}
        _hover={{
          cursor: "pointer",
          boxShadow: "md",
        }}
      >
        <Image
          width="full"
          height="fit-content"
          src={avatar}
          fallbackSrc={defaultNoImage.src}
        />
        <CardBody>
          <Stack spacing="3">
            <Title size="md">{name}</Title>
            {!!course?.instructors?.items?.length && (
              <Description>
                {course?.instructors?.items
                  ?.map((instructor) => instructor.instructor?.fullname)
                  .join(", ")}
              </Description>
            )}
            {price && <Price price={price} />}
          </Stack>
        </CardBody>
      </Card>
    );
  }
);
