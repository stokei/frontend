import { usePagination, useTranslations } from "@/hooks";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
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
  const [prices, setPrices] = useState<PriceComponentFragment[]>([]);
  const translate = useTranslations();
  const { currentPage, onChangePage } = usePagination();
  const {
    isOpen: isOpenAddPriceDrawer,
    onClose: onCloseAddPriceDrawer,
    onOpen: onOpenAddPriceDrawer,
  } = useDisclosure();

  const [{ fetching: isLoadingPrices, data: dataPrices }] =
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
          createdAt: OrderBy.Desc,
        },
      },
    });

  useEffect(() => {
    setPrices(dataPrices?.prices?.items || []);
  }, [dataPrices]);

  const onSuccessPriceAdded = useCallback(
    (price?: PriceComponentFragment) => {
      if (price) {
        setPrices((currentPrices) => [...currentPrices, price]);
        onCloseAddPriceDrawer();
      }
    },
    [onCloseAddPriceDrawer]
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

  return (
    <Section>
      <SectionInformation>
        <Stack direction="row" spacing="5" align="center">
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
          <ButtonGroup width="full" justifyContent="flex-end">
            <Button onClick={onOpenAddPriceDrawer}>
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
                    {prices?.map((price) => (
                      <PriceItem
                        price={price}
                        onSuccessPriceActivated={onSuccessPriceActivated}
                        onSuccessPriceDeactivated={onSuccessPriceDeactivated}
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
      </SectionContent>
    </Section>
  );
};
