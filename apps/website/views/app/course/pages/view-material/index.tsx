import { Container, Stack } from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { CourseLayout } from "../../layout";
import { EditMaterialForm } from "./components/edit-material-form";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { useGetCourseMaterialQuery } from "./graphql/material.query.graphql.generated";
import { Loading } from "./loading";

export const MaterialViewPage = () => {
  const router = useRouter();

  const materialId = useMemo(
    () => router?.query?.materialId?.toString() || "",
    [router?.query?.materialId]
  );

  const [{ fetching: isLoadingGetMaterial, data: dataGetMaterial }] =
    useGetCourseMaterialQuery({
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
    <CourseLayout>
      <Navbar />
      {isLoadingGetMaterial ? (
        <Loading />
      ) : (
        <Stack direction="column" paddingY="5" spacing="5">
          <Container>
            <Header material={material} />
          </Container>
          <Container>
            <EditMaterialForm material={material} />
          </Container>
        </Stack>
      )}
    </CourseLayout>
  );
};
