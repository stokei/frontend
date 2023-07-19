import { usePagination, useTranslations } from "@/hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Loading,
  NotFound,
  NotFoundIcon,
  NotFoundSubtitle,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
  useDisclosure,
} from "@stokei/ui";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useGetProductPagePricesQuery } from "../../graphql/prices.query.graphql.generated";
import { ProductPageProductFragment } from "../../graphql/product.query.graphql.generated";
import { PriceItem } from "../price-item";
import { OrderBy, Price } from "@/services/graphql/stokei";
import { SectionContent } from "../section-content";
import { Section } from "../section";
import { SectionInformation } from "../section-information";
import { AddPriceDrawer } from "../add-price-drawer";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";

interface PricesProps {
  productId?: string;
}

export const Prices: FC<PricesProps> = ({ productId }) => {
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
          limit: 5,
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
    const pricesWithoutDefaultPrice = prices?.filter(
      (price) => !price?.isDefault
    );
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
      <SectionContent>
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
                <Box width="full" flexDirection="column" overflow="hidden">
                  <Box width="full" flexDirection="column" overflowX="auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHeaderCell>
                            {translate.formatMessage({ id: "name" })}
                          </TableHeaderCell>
                          <TableHeaderCell>
                            {translate.formatMessage({ id: "value" })}
                          </TableHeaderCell>
                          <TableHeaderCell>
                            {translate.formatMessage({ id: "period" })}
                          </TableHeaderCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pricesSorted?.map((price) => (
                          <PriceItem
                            key={price?.id}
                            isFirstPrice={isFirstPrice}
                            price={price}
                            onSuccessPriceUpdated={() =>
                              onReloadPrices({ requestPolicy: "network-only" })
                            }
                            onSuccessPriceActivated={onSuccessPriceActivated}
                            onSuccessPriceDeactivated={
                              onSuccessPriceDeactivated
                            }
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Box>
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
      </SectionContent>
    </Section>
  );
};
