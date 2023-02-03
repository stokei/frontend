import { useCurrentApp } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { Container, SimpleGrid } from "@stokei/ui";
import { FC, useEffect } from "react";
import { Product } from "../product";
import { ProductSkeleton } from "../product-skeleton";
import { useProductsQuery } from "./products.query.graphql.generated";

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
        orderBy: {
          createdAt: OrderBy.Desc,
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
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {dataProducts?.products?.items?.map((product) => (
              <Product
                key={product?.id}
                id={product?.id}
                name={product?.name}
                avatar={product?.avatar?.file?.url || ""}
                description={product?.description}
                defaultPrice={product?.defaultPrice}
                plan={product?.plan}
                course={product?.course}
                prices={product?.prices?.items}
              />
            ))}
          </>
        )}
      </SimpleGrid>
    </Container>
  );
};
