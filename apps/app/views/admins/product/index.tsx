import { useTranslations } from "@/hooks";
import { AdminLayout } from "@/views/admins/layout";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Navbar } from "./components/navbar";
import { Prices } from "./components/prices";
import { ProductInformation } from "./components/product-information";
import { useGetProductPageProductQuery } from "./graphql/product.query.graphql.generated";
import { Loading } from "./loading";

interface ProductPageProps {}

export const ProductPage: FC<ProductPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();

  const productId = useMemo(
    () => router?.query?.productId?.toString(),
    [router]
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
    <AdminLayout>
      <Navbar />
      {isLoadingProduct ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <ProductInformation currentProduct={currentProduct} />
            <Prices productId={productId} />
          </Stack>
        </Container>
      )}
    </AdminLayout>
  );
};
