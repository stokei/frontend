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
import { routes } from "@/routes";
import { useRouter } from "next/router";
import { LandingPageProductsCourseFragment } from "../../graphql/products-course.fragment.graphql.generated";
import { LandingPageProductsPlanFragment } from "../../graphql/products-plan.fragment.graphql.generated";

export interface ProductItemProps {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly description?: string | null;
  readonly plan?: LandingPageProductsPlanFragment | null;
  readonly course?: LandingPageProductsCourseFragment | null;
  readonly defaultPrice?: PriceFragment | null;
}

export const ProductItem: FC<ProductItemProps> = memo(
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
        return routes.course.home({ product: productId || "" });
      }
      return "";
    }, [productId, course]);

    const goToCheckout = useCallback(() => {
      router.push(productURL);
    }, [productURL, router]);

    return (
      <Card background="background.50" overflow="hidden" minW="280px">
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
