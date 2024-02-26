import { useTranslations } from "@/hooks";
import {
  Card,
  CardBody,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from "@stokei/ui";
import { useMemo } from "react";
import { useGetAppBillingQuery } from "../../graphql/billing.query.graphql.generated";

export const BillingList = () => {
  const translate = useTranslations();

  const [{ data: dataBilling, fetching: isLoadingBilling }] =
    useGetAppBillingQuery();

  const billing = useMemo(() => dataBilling?.billing, [dataBilling?.billing]);
  const billingItems = useMemo(() => {
    const itemsSorted = billing?.items?.sort((itemA, itemB) => {
      const nameA = itemA.price?.nickname?.toUpperCase() || "";
      const nameB = itemB.price?.nickname?.toUpperCase() || "";
      if (nameA < nameB) {
        return -1;
      }
      return 1;
    });
    return itemsSorted;
  }, [billing?.items]);

  return (
    <Card background="background.50">
      <CardBody>
        <Stack direction="column" spacing="5">
          <Table variant="unstyled">
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  {translate.formatMessage({ id: "plan" })}
                </TableHeaderCell>
                <TableHeaderCell textAlign="right">
                  {translate.formatMessage({ id: "price" })}
                </TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingItems?.map((item) => {
                const priceAmount = translate.formatMoney({
                  showSymbol: true,
                  currency: item.price?.currency?.id || "",
                  amount: item?.price?.amount || 0,
                  minorUnit: item.price?.currency?.minorUnit || 0,
                });
                const quantity = translate.formatNumber(item.quantity || 0);
                return (
                  <TableRow key={item.price?.id}>
                    <TableCell>
                      <Stack direction="column" spacing="1">
                        <Text
                          fontSize="lg"
                          fontWeight="semibold"
                          color="primary.500"
                        >
                          {item.price?.nickname}
                        </Text>
                        <Text fontSize="sm">
                          {`${quantity} ${
                            item.price?.unit || ""
                          } x ${priceAmount}`}
                        </Text>
                      </Stack>
                    </TableCell>
                    <TableCell textAlign="right">
                      <Text fontSize="lg" fontWeight="medium">
                        {translate.formatMoney({
                          showSymbol: true,
                          currency: item.price?.currency?.id || "",
                          amount: item?.total || 0,
                          minorUnit: item.price?.currency?.minorUnit || 0,
                        })}
                      </Text>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <Stack direction="row" spacing="5" align="center" justify="flex-end">
            <Text fontWeight="bold">
              {translate.formatMessage({ id: "total" })}:
            </Text>

            <Stack
              width="fit-content"
              direction="row"
              align="center"
              justify="center"
            >
              <Text fontSize="md" fontWeight="600">
                {billing?.currency?.symbol}
              </Text>
              <Text
                fontSize="3xl"
                color="primary.500"
                fontWeight="900"
                lineHeight="shorter"
              >
                {translate.formatMoney({
                  currency: billing?.currency?.id || "",
                  amount: billing?.total || 0,
                  minorUnit: billing?.currency?.minorUnit || 0,
                })}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};
