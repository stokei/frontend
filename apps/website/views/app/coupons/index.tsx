import { useCurrentApp, usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import { AppLayout } from "@/views/app/layout";
import {
  Container,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  useDisclosure,
} from "@stokei/ui";
import { FC, useMemo, useState } from "react";
import { AddCouponDrawer } from "./components/add-coupon-drawer";
import { CouponItem } from "./components/coupon-item";
import { EditCouponDrawer } from "./components/edit-coupon-drawer";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import {
  CouponPageCouponFragment,
  useGetCouponPageCouponsQuery,
} from "./graphql/coupons.query.graphql.generated";
import { Loading } from "./loading";
import { CouponFilters } from "./components/coupon-filters";
import { useFilters } from "./hooks/use-filters";

interface CouponsPageProps {}

export const CouponsPage: FC<CouponsPageProps> = () => {
  const { codeFilter, activeFilter, setCodeFilter, setActiveFilter } =
    useFilters();
  const [couponToEdit, setCouponToEdit] = useState<CouponPageCouponFragment>();
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const { currentApp } = useCurrentApp();

  const {
    isOpen: isOpenAddCouponDrawer,
    onClose: onCloseAddCouponDrawer,
    onOpen: onOpenAddCouponDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenEditCouponDrawer,
    onClose: onCloseEditCouponDrawer,
    onOpen: onOpenEditCouponDrawer,
  } = useDisclosure();
  const { isOpen: isOpenFiltersDrawer, onToggle: onToggleFiltersDrawer } =
    useDisclosure();

  const [{ fetching: isLoading, data: dataGetCoupons }, onReloadCoupons] =
    useGetCouponPageCouponsQuery({
      pause: !currentApp?.id,
      requestPolicy: "network-only",
      variables: {
        page: {
          limit: 10,
          number: currentPage,
        },
        orderBy: {
          createdAt: OrderBy.Desc,
          active: OrderBy.Desc,
        },
        where: {
          AND: {
            parent: {
              equals: currentApp?.id,
            },
            ...(codeFilter && {
              code: {
                search: codeFilter,
              },
            }),
            ...(typeof activeFilter === "boolean" && {
              active: {
                equals: activeFilter,
              },
            }),
          },
        },
      },
    });

  const coupons = useMemo(
    () => dataGetCoupons?.coupons?.items || [],
    [dataGetCoupons?.coupons?.items]
  );
  return (
    <AppLayout>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Container paddingY="5">
          <Stack direction="column" spacing="5">
            <AddCouponDrawer
              isOpenDrawer={isOpenAddCouponDrawer}
              onCloseDrawer={onCloseAddCouponDrawer}
              onSuccess={() =>
                onReloadCoupons({ requestPolicy: "network-only" })
              }
            />
            <EditCouponDrawer
              coupon={couponToEdit}
              isOpenDrawer={isOpenEditCouponDrawer}
              onCloseDrawer={() => {
                onCloseEditCouponDrawer();
                setCouponToEdit(undefined);
              }}
              onSuccess={() =>
                onReloadCoupons({ requestPolicy: "network-only" })
              }
            />
            <CouponFilters
              isOpen={isOpenFiltersDrawer}
              onClose={onToggleFiltersDrawer}
              codeFilter={codeFilter}
              onChangeCodeFilter={setCodeFilter}
              activeFilter={activeFilter}
              onChangeActiveFilter={setActiveFilter}
            />
            <Header
              onAdd={onOpenAddCouponDrawer}
              onOpenFilters={onToggleFiltersDrawer}
              totalCount={dataGetCoupons?.coupons?.totalCount || 0}
            />
            {!coupons?.length ? (
              <NotFound>
                <NotFoundIcon name="coupon" />
                <NotFoundSubtitle>
                  {translate.formatMessage({
                    id: "couponsNotFound",
                  })}
                </NotFoundSubtitle>
              </NotFound>
            ) : (
              <Stack direction="column" spacing="5">
                {coupons?.map((coupon) => (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    onOpenEditCouponDrawer={() => {
                      setCouponToEdit(coupon);
                      onOpenEditCouponDrawer();
                    }}
                  />
                ))}
                {dataGetCoupons?.coupons?.totalPages &&
                  dataGetCoupons?.coupons?.totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      onChangePage={onChangePage}
                      hasNextPage={!!dataGetCoupons?.coupons?.hasNextPage}
                      hasPreviousPage={
                        !!dataGetCoupons?.coupons?.hasPreviousPage
                      }
                      totalPages={dataGetCoupons?.coupons?.totalPages || 1}
                    />
                  )}
              </Stack>
            )}
          </Stack>
        </Container>
      )}
    </AppLayout>
  );
};
