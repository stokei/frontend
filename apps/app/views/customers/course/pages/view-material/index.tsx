import { DownloadFileButton } from "@/components";
import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getProductURL } from "@/utils";
import { Box, Container, Image, Markdown, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { CourseLayout } from "../../layout";
import { Navbar } from "./components/navbar";
import { useGetCustomersCoursePageMaterialQuery } from "./graphql/material.query.graphql.generated";

interface MaterialViewPageProps {}

export const MaterialViewPage: FC<MaterialViewPageProps> = () => {
  const { currentAccount } = useCurrentAccount();
  const translate = useTranslations();
  const router = useRouter();

  const materialId = useMemo(
    () => router.query?.materialId?.toString() || "",
    [router.query?.materialId]
  );

  const [{ data: dataGetMaterials, fetching: isLoadingGetMaterials }] =
    useGetCustomersCoursePageMaterialQuery({
      pause: !currentAccount || !materialId,
      requestPolicy: "network-only",
      variables: {
        materialId,
      },
    });

  const material = useMemo(() => {
    return dataGetMaterials?.material;
  }, [dataGetMaterials?.material]);

  return (
    <CourseLayout>
      <Navbar />
      <Container paddingY="5">
        <Stack direction="column" spacing="5">
          <Stack
            direction={["column", "column", "row", "row"]}
            spacing="5"
            align={["flex-start", "flex-start", "center", "center"]}
          >
            <Image
              width="24"
              rounded="sm"
              src={getProductURL(material?.avatar?.file?.url)}
              alt={translate.formatMessage({ id: "material" })}
            />
            <Stack direction="column" spacing="4">
              <Title fontSize="lg">{material?.name}</Title>
            </Stack>
          </Stack>

          {material && <DownloadFileButton fileId={material?.file?.id || ""} />}

          {material?.description && (
            <Box width="full" flexDirection="row">
              <Markdown text={material?.description || ""} />
            </Box>
          )}
        </Stack>
      </Container>
    </CourseLayout>
  );
};
