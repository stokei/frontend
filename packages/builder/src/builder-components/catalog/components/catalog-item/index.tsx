import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Description,
  Image,
  Stack,
  Title,
  useDisclosure
} from "@stokei/ui";
import { useMemo } from "react";

import defaultNoImage from "../../../../assets/no-image.png";
import { Price } from "../../../../components";
import {
  useBuilder,
  useTranslations
} from "../../../../hooks";
import { ProductModal } from "../product-modal";
import { GeneralProductFragment } from "../../../../services/graphql/types/product.fragment.graphql.generated";

export interface CatalogItemProps {
  readonly product?: GeneralProductFragment;
}

export const CatalogItem = ({ product }: CatalogItemProps) => {
  const {
    isOpen: isOpenProductModal,
    onToggle: onToggleProductModal,
  } = useDisclosure();
  const { routes } = useBuilder();
  const translate = useTranslations();

  const course = useMemo(
    () => (product?.externalReference?.__typename === "Course" ? product?.externalReference : null),
    [product?.externalReference]
  );
  const price = useMemo(
    () => product?.defaultPrice,
    [product?.defaultPrice]
  );
  const productURL = useMemo(
    () =>
      routes.product({ product: product?.id || "", price: price?.id }),
    [price?.id, product?.id, routes]
  );

  return (
    <>
      <ProductModal
        isOpen={isOpenProductModal}
        onClose={onToggleProductModal}
        product={product}
        productURL={productURL}
      />
      <Card
        background="background.50"
        onClick={onToggleProductModal}
        cursor="pointer"
        _hover={{
          shadow: "md",
        }}
      >
        <CardHeader
          position="relative"
          padding="0"
          borderTopRadius="md"
          overflow="hidden"
        >
          <Image
            width="full"
            src={product?.avatar?.file?.url || ""}
            fallbackSrc={defaultNoImage.src}
            alt={translate.formatMessage({ id: "product" })}
          />
          {product?.defaultPrice?.discountPercent && (
            <Box position="absolute" transform="rotate(45deg)" right="-7" top="5">
              <Badge variant="solid" width="28" colorScheme="red" color="white.500">
                {product?.defaultPrice?.discountPercent}% OFF
              </Badge>
            </Box>
          )}
        </CardHeader>
        <CardBody display="flex" flexDirection="column" justifyContent="flex-end">
          <Stack spacing="5" direction="column">
            <Title fontSize="md" color="inherit">
              {product?.name}
            </Title>
            {!!course?.instructors?.items?.length && (
              <Description>
                {course?.instructors?.items
                  ?.map((instructor) => instructor.instructor?.fullname)
                  .join(", ")}
              </Description>
            )}
          </Stack>
        </CardBody>
        {price && (
          <CardFooter
            paddingTop="0"
          >
            <Box width="full">
              <Price
                price={price}
              />
            </Box>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
