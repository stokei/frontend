import { useGetCatalogPageCatalogQuery } from "@/views/app/catalog/graphql/catalog.query.graphql.generated";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { CatalogLayout } from "../layout";
import { Navbar } from "./components/navbar";
import { Products } from "./components/products";
import { Loading } from "./loading";

export const ProductsPage = () => {
  const router = useRouter();
  const catalogId = useMemo(
    () => router?.query?.catalogId?.toString() || "",
    [router?.query?.catalogId]
  );
  const [{ data: dataCatalog, fetching: isLoadingCatalog }] =
    useGetCatalogPageCatalogQuery({
      requestPolicy: 'network-only',
      variables: {
        catalog: catalogId,
      },
    });

  const catalog = useMemo(() => dataCatalog?.catalog, [dataCatalog?.catalog]);

  return (
    <CatalogLayout>
      <Navbar />
      <Container paddingY="5">
        {isLoadingCatalog ? (
          <Loading />
        ) : (
          <Stack direction="column" spacing="5">
            <Products catalog={catalog} />
          </Stack>
        )}
      </Container>
    </CatalogLayout>
  );
};
