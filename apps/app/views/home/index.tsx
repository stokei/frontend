import { useCurrentApp } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { Box } from "@stokei/ui";
import { FC } from "react";
import { HomeLayout } from "./layout";
import { ProductsList } from "./components/products-list";
import { useProductsQuery } from "./graphql/products.query.graphql.generated";

interface HomePageProps {}

export const HomePage: FC<HomePageProps> = () => {
  const { currentApp } = useCurrentApp();
  const [{ fetching: isLoadingProducts, data: dataProducts }] =
    useProductsQuery({
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

  return (
    <HomeLayout isLoading={isLoadingProducts}>
      <Box paddingY="10">
        <ProductsList products={dataProducts?.products} />
      </Box>
    </HomeLayout>
  );
};
