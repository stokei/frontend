import { useTranslations } from "@/hooks";
import { routes } from "@/routes";
import { AdminLayout } from "@/views/admins/layout";
import { Button, Container, Icon, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { Catalogs } from "./components/catalogs";
import { Navbar } from "./components/navbar";
import { Prices } from "./components/prices";
import { ProductInformation } from "./components/product-information";

interface ProductPageProps {}

export const ProductPage: FC<ProductPageProps> = () => {
  const router = useRouter();
  const translate = useTranslations();

  const productId = useMemo(
    () => router?.query?.productId?.toString(),
    [router]
  );

  const goBackToProducts = () => {
    router.push(routes.admins.products.home);
  };

  return (
    <AdminLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="10">
          <Stack direction="row" spacing="5" justify="space-between">
            <Button
              size="sm"
              variant="link"
              leftIcon={<Icon name="back" />}
              onClick={goBackToProducts}
            >
              {translate.formatMessage({ id: "back" })}
            </Button>
            <Button
              size="sm"
              variant="link"
              onClick={() => {}}
              colorScheme="red"
            >
              {translate.formatMessage({ id: "cancelProduct" })}
            </Button>
          </Stack>
          <Stack direction="column" spacing="5">
            <ProductInformation />
            <Prices />
            <Catalogs />
          </Stack>
        </Stack>
      </Container>
    </AdminLayout>
  );
};
