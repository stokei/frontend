import { useCurrentApp } from "@/hooks";
import { Container, Grid, GridItem, SimpleGrid } from "@stokei/ui";
import { FC, useEffect } from "react";
import { Product } from "../product";
import { useProductsQuery } from "./products.graphql.generated";

interface ProductsSectionProps {}

export const ProductsSection: FC<ProductsSectionProps> = () => {
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoading, data: dataProducts }, loadQuery] =
    useProductsQuery({
      requestPolicy: "network-only",
      pause: true,
      variables: {
        where: {
          AND: {
            app: {
              equals: currentApp?.id,
            },
          },
        },
      },
    });

  useEffect(() => {
    if (currentApp) {
      loadQuery();
    }
  }, [currentApp, loadQuery]);

  return (
    <Container paddingY="5">
      <SimpleGrid columns={[2, 2, 4, 4]} spacing="5">
        {dataProducts?.products?.items?.map((product) => (
          <Product
            key={product?.id}
            id={product?.id}
            name={product?.name}
            avatar={product?.avatar?.url || ""}
            description={product?.description}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
