import { useGetCatalogPageCatalogQuery } from "@/views/app/catalog/graphql/catalog.query.graphql.generated";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CatalogLayout } from "../layout";
import { EditCatalog } from "./components/edit-catalog";
import { Navbar } from "./components/navbar";
import { Loading } from "./loading";

interface CatalogPageProps {}

export const CatalogPage: FC<CatalogPageProps> = () => {
  const router = useRouter();
  const catalogId = useMemo(
    () => router?.query?.catalogId?.toString() || "",
    [router?.query?.catalogId]
  );
  const [{ data: dataCatalog, fetching: isLoadingCatalog }] =
    useGetCatalogPageCatalogQuery({
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
            <EditCatalog catalog={catalog} />
          </Stack>
        )}
      </Container>
    </CatalogLayout>
  );
};
