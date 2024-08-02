import { DownloadFileButton } from "@/components";
import { useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getProductURL } from "@/utils";
import { CustomerLayout } from "@/views/customers/layout";
import { Box, Container, Image, Loading, Markdown, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/navbar";
import { SubscriptionContractActiveByProductItemMaterialFragment, useGetSubscriptionContractActiveByProductQuery } from "./graphql/subscription-contract-by-product.query.graphql.generated";

export const MaterialViewPage = () => {
  const [material, setMaterial] =
    useState<SubscriptionContractActiveByProductItemMaterialFragment>();
  const { currentAccount } = useCurrentAccount();
  const translate = useTranslations();
  const router = useRouter();

  const materialId = useMemo(
    () => router.query?.materialId?.toString() || "",
    [router.query?.materialId]
  );

  const [
    {
      data: dataGetMaterials,
      fetching: isLoadingGetMaterials,
    },
  ] = useGetSubscriptionContractActiveByProductQuery({
    pause: !currentAccount || !materialId,
    requestPolicy: "network-only",
    variables: {
      input: {
        product: materialId,
      },
    },
  });

  const subscriptionContractActive = useMemo(() => dataGetMaterials?.subscriptionContractActiveByProduct, [dataGetMaterials?.subscriptionContractActiveByProduct]);

  useEffect(() => {
    if (!materialId) {
      return;
    }
    const currentMaterial = subscriptionContractActive?.items?.items
      ?.find((item) =>
        item?.product?.__typename === "Material" &&
        item?.product?.id === materialId
      )
      ?.product;
    if (currentMaterial?.__typename === "Material") {
      setMaterial(currentMaterial);
      return;
    }
  }, [materialId, subscriptionContractActive?.items?.items]);

  return (
    <CustomerLayout>
      <Navbar />
      <Container paddingY="5">
        {!material || isLoadingGetMaterials ? (
          <Loading />
        ) : (
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
        )}
      </Container>
    </CustomerLayout>
  );
};
