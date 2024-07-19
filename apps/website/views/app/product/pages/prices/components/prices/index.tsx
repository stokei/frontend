import { PriceComponentFragment } from "@stokei/builder";
import { usePagination, useTranslations } from "@/hooks";
import { OrderBy } from "@/services/graphql/stokei";
import {
  Button,
  ButtonGroup,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  Text,
  Title,
  useDisclosure
} from "@stokei/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "../../../../components/section";
import { SectionInformation } from "../../../../components/section-information";
import { useGetProductPagePricesQuery } from "../../graphql/prices.query.graphql.generated";
import { AddPriceDrawer } from "../add-price-drawer";
import { PriceItem } from "../price-item";

interface PricesProps {
  productId?: string;
}

export const Prices = ({ productId }: PricesProps) => {
  const [isFirstPrice, setIsFirstPrice] = useState<boolean>(false);
  const [prices, setPrices] = useState<PriceComponentFragment[]>([]);
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const {
    isOpen: isOpenAddPriceDrawer,
    onClose: onCloseAddPriceDrawer,
    onOpen: onOpenAddPriceDrawer,
  } = useDisclosure();

  const [{ fetching: isLoadingPrices, data: dataPrices }, onReloadPrices] =
    useGetProductPagePricesQuery({
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
          active: OrderBy.Asc,
          createdBy: OrderBy.Desc,
        },
      },
    });

  useEffect(() => {
    setPrices(dataPrices?.prices?.items || []);
    setIsFirstPrice(dataPrices?.prices?.totalCount === 1);
  }, [dataPrices]);

  const onSuccessPriceAdded = useCallback(
    (price?: PriceComponentFragment) => {
      if (price) {
        onReloadPrices({ requestPolicy: "network-only" });
        onCloseAddPriceDrawer();
      }
    },
    [onCloseAddPriceDrawer, onReloadPrices]
  );

  const onSuccessPriceActivated = useCallback(
    (price?: PriceComponentFragment) => {
      if (price) {
        setPrices((currentPrices) =>
          currentPrices?.map((currentPrice) => {
            if (currentPrice?.id === price?.id) {
              return {
                ...currentPrice,
                active: true,
              };
            }
            return currentPrice;
          })
        );
      }
    },
    []
  );

  const onSuccessPriceDeactivated = useCallback(
    (price?: PriceComponentFragment) => {
      if (price) {
        setPrices((currentPrices) =>
          currentPrices?.map((currentPrice) => {
            if (currentPrice?.id === price?.id) {
              return {
                ...currentPrice,
                active: true,
              };
            }
            return currentPrice;
          })
        );
      }
    },
    []
  );

  const pricesSorted = useMemo(() => {
    const defaultPrice = prices?.find((price) => !!price?.isDefault);
    const pricesWithoutDefaultPrice = prices
      ?.filter((price) => !price?.isDefault)
      ?.sort((priceA) => {
        if (!priceA.active) {
          return 1;
        }
        return -1;
      });
    return defaultPrice
      ? [defaultPrice, ...pricesWithoutDefaultPrice]
      : [...pricesWithoutDefaultPrice];
  }, [prices]);

  return (
    <Section>
      <SectionInformation>
        <Stack
          direction={["column", "column", "row", "row"]}
          spacing="5"
          align={["flex-start", "flex-start", "center", "center"]}
        >
          <Stack direction="column" spacing="1">
            <Title fontSize="lg">
              {translate.formatMessage({ id: "prices" })}
            </Title>
            <Text fontSize="md">
              {translate.formatMessage({
                id: "managePricingForYourProductsSubscriptionPlans",
              })}
            </Text>
          </Stack>
          <ButtonGroup>
            <Button onClick={onOpenAddPriceDrawer} isDisabled={isLoadingPrices}>
              {translate.formatMessage({ id: "add" })}
            </Button>
          </ButtonGroup>
        </Stack>
      </SectionInformation>
      <AddPriceDrawer
        isOpenDrawer={isOpenAddPriceDrawer}
        onCloseDrawer={onCloseAddPriceDrawer}
        onSuccess={onSuccessPriceAdded}
        productId={productId}
      />
      {isLoadingPrices ? (
        <Loading />
      ) : (
        <>
          {!prices?.length ? (
            <NotFound>
              <NotFoundIcon name="price" />
              <NotFoundSubtitle>
                {translate.formatMessage({ id: "pricesNotFound" })}
              </NotFoundSubtitle>
            </NotFound>
          ) : (
            <Stack direction="column" spacing="5">
              {pricesSorted?.map((price) => (
                <PriceItem
                  key={price?.id}
                  isFirstPrice={isFirstPrice}
                  price={price}
                  onSuccessPriceUpdated={() =>
                    onReloadPrices({ requestPolicy: "network-only" })
                  }
                  onSuccessPriceActivated={onSuccessPriceActivated}
                  onSuccessPriceDeactivated={onSuccessPriceDeactivated}
                />
              ))}

              {dataPrices?.prices?.totalPages &&
                dataPrices?.prices?.totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    onChangePage={onChangePage}
                    hasNextPage={!!dataPrices?.prices?.hasNextPage}
                    hasPreviousPage={!!dataPrices?.prices?.hasPreviousPage}
                    totalPages={dataPrices?.prices?.totalPages || 1}
                  />
                )}
            </Stack>
          )}
        </>
      )}
    </Section>
  );
};
