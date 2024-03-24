import { DownloadFileButton } from "@/components";
import { useCurrentApp, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { routes } from "@/routes";
import { SubscriptionContractStatus } from "@/services/graphql/stokei";
import { getProductURL } from "@/utils";
import { CustomerLayout } from "@/views/customers/layout";
import { Box, Container, Image, Markdown, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  AppSubscriptionContractsByItemMaterialFragment,
  AppSubscriptionContractsByItemMaterialProductMaterialFragment,
  useGetAppSubscriptionContractsByItemMaterialsQuery,
} from "../../graphql/subscription-contracts.query.graphql.generated";
import { Navbar } from "./components/navbar";

export const MaterialViewPage = () => {
  const [material, setMaterial] =
    useState<AppSubscriptionContractsByItemMaterialProductMaterialFragment>();
  const { currentAccount } = useCurrentAccount();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const router = useRouter();

  const materialId = useMemo(
    () => router.query?.materialId?.toString() || "",
    [router.query?.materialId]
  );

  const [
    {
      data: dataGetMaterials,
      error: errorGetMaterials,
      fetching: isLoadingGetMaterials,
    },
  ] = useGetAppSubscriptionContractsByItemMaterialsQuery({
    pause: !currentAccount || !materialId,
    requestPolicy: "network-only",
    variables: {
      page: {
        limit: 1,
      },
      where: {
        app: {
          equals: currentApp?.id,
        },
        parent: {
          equals: currentAccount?.id,
        },
        product: {
          startsWith: materialId,
        },
        status: SubscriptionContractStatus.Active,
      },
    },
  });

  useEffect(() => {
    const items = dataGetMaterials?.subscriptionContractsByItem?.items
      ?.map((item) => {
        const subscriptionContractItem = item?.items?.items?.[0];
        return subscriptionContractItem?.product?.__typename === "Material"
          ? subscriptionContractItem.product
          : undefined;
      })
      .filter(Boolean);
    const currentMaterial = items?.[0];
    if (!!currentMaterial) {
      setMaterial(currentMaterial);
      return;
    } else {
      if (dataGetMaterials?.subscriptionContractsByItem?.totalCount === 0) {
        router.push(routes.notFound);
      }
    }
  }, [dataGetMaterials, errorGetMaterials, router]);

  return (
    <CustomerLayout>
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
    </CustomerLayout>
  );
};
