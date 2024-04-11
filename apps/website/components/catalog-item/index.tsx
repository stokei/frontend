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
import { useCallback, useMemo } from "react";

import defaultNoImage from "@/assets/no-image.png";
import { Price } from "@/components/price";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useCurrentApp, useTranslations } from "@/hooks";
import { websiteRoutes } from "@stokei/routes";
import { useRouter } from "next/router";
import { SortedItemComponentCatalogItemProductFragment } from "../sorted-item-factory/graphql/sorted-item.fragment.graphql.generated";

export interface CatalogItemProps {
  readonly productId?: string;
  readonly name?: string;
  readonly avatar?: string;
  readonly avatarURL?: string;
  readonly parent?:
    | SortedItemComponentCatalogItemProductFragment["parent"]
    | null;
  readonly defaultPrice?: PriceComponentFragment | null;
}

export const CatalogItem = ({
  productId,
  name,
  avatar,
  defaultPrice,
  parent,
}: CatalogItemProps) => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();
  const isAvailable = !!defaultPrice;

  const course = useMemo(
    () => (parent?.__typename === "Course" ? parent : null),
    [parent]
  );

  const productURL = useMemo(() => {
    if (productId) {
      return websiteRoutes.app({ appId: currentApp?.id }).product({
        product: productId || "",
      }).home;
    }
    return "";
  }, [currentApp?.id, productId]);

  const goToCheckout = useCallback(() => {
    router.push(productURL);
  }, [productURL, router]);

  return (
    <Card background="background.50" overflow="hidden" minW="280px">
      <CardHeader position="relative" padding="0">
        <Image
          width="full"
          src={avatar}
          fallbackSrc={defaultNoImage.src}
          alt={translate.formatMessage({ id: "course" })}
        />
        {defaultPrice?.discountPercent && (
          <Box position="absolute" transform="rotate(45deg)" right="-7" top="3">
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
            <Button
              width="full"
              onClick={goToCheckout}
              isDisabled={!isAvailable}
            >
              {translate.formatMessage({
                id: isAvailable ? "buyNow" : "unavailable",
              })}
            </Button>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};
