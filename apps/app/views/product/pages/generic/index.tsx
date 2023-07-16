import { Container, Stack } from "@stokei/ui";
import { FC } from "react";
import { ProductPageProductFragment } from "../graphql/product.query.graphql.generated";
import { CheckoutInfo } from "./components/checkout-info";
import { Features } from "./components/features";
import { GenericProductDescription } from "./components/generic-product-description";
import { Header } from "./components/header";
import { GenericProductLayout } from "./layout";

interface GenericProductPageProps {
  readonly product: ProductPageProductFragment;
}

export const GenericProductPage: FC<GenericProductPageProps> = ({
  product,
}) => {
  return (
    <GenericProductLayout>
      <Container paddingY="10" background="black.500">
        <Header productName={product?.name} />
      </Container>
      <Container paddingY="10">
        <Stack
          spacing="10"
          direction={["column-reverse", "column-reverse", "row", "row"]}
        >
          <Stack spacing="10" direction="column" width="auto" flex="1">
            {!!product?.features?.totalCount && (
              <Features features={product?.features} />
            )}

            {product?.description && (
              <GenericProductDescription description={product?.description} />
            )}
          </Stack>

          <CheckoutInfo
            avatarURL={product?.avatar?.file?.url || ""}
            productId={product?.id}
            defaultPrice={product?.defaultPrice}
            features={product?.features}
          />
        </Stack>
      </Container>
    </GenericProductLayout>
  );
};
