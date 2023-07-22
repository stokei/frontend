import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { EditMaterialForm } from "./components/edit-material-form";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { useGetAppMaterialQuery } from "./graphql/material.query.graphql.generated";
import { Loading } from "./loading";

interface MaterialViewPageProps {}

export const MaterialViewPage: FC<MaterialViewPageProps> = () => {
  const router = useRouter();

  const materialId = useMemo(
    () => router?.query?.materialId?.toString() || "",
    [router?.query?.materialId]
  );

  const [{ fetching: isLoadingGetMaterial, data: dataGetMaterial }] =
    useGetAppMaterialQuery({
      pause: !materialId,
      requestPolicy: "network-only",
      variables: {
        material: materialId,
      },
    });

  const material = useMemo(
    () => dataGetMaterial?.material,
    [dataGetMaterial?.material]
  );

  return (
    <AppLayout>
      <Navbar />
      {isLoadingGetMaterial ? (
        <Loading />
      ) : (
        <Stack direction="column" paddingY="5" spacing="5">
          <Container>
            <Header materialId={materialId} />
          </Container>
          <Container>
            <EditMaterialForm material={material} />
          </Container>
        </Stack>
      )}
    </AppLayout>
  );
};
