import { Container, Stack } from "@stokei/ui";

import { CheckoutInfo } from "../../components/checkout-info";
import { Features } from "./components/features";
import { GenericProductDescription } from "./components/generic-product-description";
import { Header } from "./components/header";
import { GenericProductLayout } from "./layout";
import { GeneralProductFragment } from "@/services/graphql/types/product.fragment.graphql.generated";

interface GenericProductPageProps {
  readonly product: GeneralProductFragment;
}

export const GenericProductPage = ({ product }: GenericProductPageProps) => {
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
            product={product}
            avatarURL={product?.avatar?.file?.url || ""}
            defaultPrice={product?.defaultPrice}
            features={product?.features}
            prices={product?.prices}
          />
        </Stack>
      </Container>
    </GenericProductLayout>
  );
};
