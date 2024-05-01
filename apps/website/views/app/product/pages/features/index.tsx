import { usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ProductLayout } from "../../layout";
import { AddFeatureDrawer } from "./components/add-feature-drawer";
import { FeaturesList } from "./components/features-list";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { useGetProductPageFeaturesQuery } from "./graphql/features.query.graphql.generated";
import { Loading } from "./loading";

export const FeaturesPage = () => {
  const router = useRouter();
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const {
    isOpen: isOpenAddFeatureDrawer,
    onClose: onCloseAddFeatureDrawer,
    onOpen: onOpenAddFeatureDrawer,
  } = useDisclosure();

  const productId = useMemo(
    () => router?.query?.productId?.toString(),
    [router?.query?.productId]
  );

  const [
    { fetching: isLoadingFeatures, data: dataFeatures },
    onReloadFeatures,
  ] = useGetProductPageFeaturesQuery({
    pause: !productId,
    requestPolicy: "network-only",
    variables: {
      where: {
        AND: {
          parent: {
            equals: productId,
          },
        },
      },
      page: {
        limit: 10,
        number: currentPage,
      },
      orderBy: {
        name: OrderBy.Asc,
      },
    },
  });

  const features = useMemo(
    () => dataFeatures?.features?.items || [],
    [dataFeatures?.features]
  );

  return (
    <ProductLayout>
      <Navbar />
      <AddFeatureDrawer
        isOpenDrawer={isOpenAddFeatureDrawer}
        onCloseDrawer={onCloseAddFeatureDrawer}
        onSuccess={() => onReloadFeatures({ requestPolicy: "network-only" })}
        productId={productId}
      />
      {isLoadingFeatures ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <Header
              featuresTotalCount={dataFeatures?.features?.totalCount || 0}
              onOpenAddFeature={onOpenAddFeatureDrawer}
            />
            {!features?.length ? (
              <NotFound>
                <NotFoundIcon name="feature" />
                <NotFoundSubtitle>
                  {translate.formatMessage({ id: "featuresNotFound" })}
                </NotFoundSubtitle>
              </NotFound>
            ) : (
              <FeaturesList
                features={features}
                onRemovedFeatures={() =>
                  onReloadFeatures({ requestPolicy: "network-only" })
                }
              />
            )}
            {dataFeatures?.features?.totalPages &&
              dataFeatures?.features?.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onChangePage={onChangePage}
                  hasNextPage={!!dataFeatures?.features?.hasNextPage}
                  hasPreviousPage={!!dataFeatures?.features?.hasPreviousPage}
                  totalPages={dataFeatures?.features?.totalPages || 1}
                />
              )}
          </Stack>
        </Container>
      )}
    </ProductLayout>
  );
};
