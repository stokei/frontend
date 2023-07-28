import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useGetProductPageProductQuery } from "../../graphql/product.query.graphql.generated";
import { ProductLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { ProductInformation } from "./components/product-information";
import { Loading } from "./loading";

interface ProductPageProps {}

export const ProductPage: FC<ProductPageProps> = () => {
  const router = useRouter();

  const productId = useMemo(
    () => router?.query?.productId?.toString(),
    [router?.query?.productId]
  );

  const [{ fetching: isLoadingProduct, data: dataProduct }] =
    useGetProductPageProductQuery({
      pause: !productId,
      variables: {
        product: productId || "",
      },
    });

  const currentProduct = useMemo(() => dataProduct?.product, [dataProduct]);

  return (
    <ProductLayout>
      <Navbar />
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <ProductInformation currentProduct={currentProduct} />
          </Stack>
        </Container>
      )}
    </ProductLayout>
  );
};
