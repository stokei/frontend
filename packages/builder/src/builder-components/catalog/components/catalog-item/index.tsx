import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Description,
  Image,
  Link,
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
import { BuilderComponentCatalogItemProductFragment } from "../../graphql/catalog.query.graphql.generated";
import { ProductModal } from "../product-modal";

export interface CatalogItemProps {
  readonly product?: BuilderComponentCatalogItemProductFragment;
}

export const CatalogItem = ({ product }: CatalogItemProps) => {
  const {
    isOpen: isOpenProductModal,
    onToggle: onToggleProductModal,
  } = useDisclosure();
  const { routes } = useBuilder();
  const translate = useTranslations();

  const course = useMemo(
    () => (product?.parent?.__typename === "Course" ? product?.parent : null),
    [product?.parent]
  );
  const currentPrice = useMemo(
    () => product?.defaultPrice,
    [product?.defaultPrice]
  );
  const productURL = useMemo(
    () =>
      routes.product({ product: product?.id || "", price: currentPrice?.id }),
    [currentPrice?.id, product?.id, routes]
  );

  return (
    <>
      <ProductModal
        isOpen={isOpenProductModal}
        onClose={onToggleProductModal}
        product={product}
        productURL={productURL}
      />
      <Card background="background.50" onClick={onToggleProductModal}>
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
            <Box position="absolute" transform="rotate(45deg)" right="-7" top="3">
              <Badge variant="solid" width="24">
                {product?.defaultPrice?.discountPercent}% OFF
              </Badge>
            </Box>
          )}
        </CardHeader>
        <CardBody display="flex" flexDirection="column" justifyContent="flex-end">
          <Stack spacing="5" direction="column">
            <Link width="fit-content" href={productURL}>
              <Title fontSize="md" color="inherit">
                {product?.name}
              </Title>
            </Link>
            {!!course?.instructors?.items?.length && (
              <Description>
                {course?.instructors?.items
                  ?.map((instructor) => instructor.instructor?.fullname)
                  .join(", ")}
              </Description>
            )}
          </Stack>
        </CardBody>
        <CardFooter
          paddingTop="0"
        >
          <Box width="full">
            <Price
              price={currentPrice}
            />
          </Box>
        </CardFooter>
      </Card>
    </>
  );
};
