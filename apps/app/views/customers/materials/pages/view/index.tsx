import { DownloadFileButton } from "@/components";
import { useCurrentApp, useTranslations } from "@/hooks";
import { useCurrentAccount } from "@/hooks/use-current-account";
import { getProductURL } from "@/utils";
import { CustomerLayout } from "@/views/customers/layout";
import { Box, Container, Image, Markdown, Stack, Title } from "@stokei/ui";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useGetAppSubscriptionContractsByItemMaterialsQuery } from "../../graphql/subscription-contracts.query.graphql.generated";
import { Navbar } from "./components/navbar";

interface MaterialViewPageProps {}

export const MaterialViewPage: FC<MaterialViewPageProps> = () => {
  const { currentAccount } = useCurrentAccount();
  const { currentApp } = useCurrentApp();
  const translate = useTranslations();
  const router = useRouter();

  const materialId = useMemo(
    () => router.query?.materialId?.toString() || "",
    [router.query?.materialId]
  );

  const [{ data: dataGetMaterials, fetching: isLoadingGetMaterials }] =
    useGetAppSubscriptionContractsByItemMaterialsQuery({
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
        },
      },
    });

  const material = useMemo(() => {
    const items = dataGetMaterials?.subscriptionContractsByItem?.items
      ?.map((item) => {
        const subscriptionContractItem = item?.items?.items?.[0];
        return subscriptionContractItem?.product?.__typename === "Material"
          ? subscriptionContractItem.product
          : undefined;
      })
      .filter(Boolean);
    return items?.[0];
  }, [dataGetMaterials?.subscriptionContractsByItem?.items]);

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
