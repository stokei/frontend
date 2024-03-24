import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ProductLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { Prices } from "./components/prices";

export const PricesPage = () => {
  const router = useRouter();

  const productId = useMemo(
    () => router?.query?.productId?.toString(),
    [router?.query?.productId]
  );

  return (
    <ProductLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Prices productId={productId} />
        </Stack>
      </Container>
    </ProductLayout>
  );
};
