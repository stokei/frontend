import { AppLayout } from "@/views/app/layout";
import { Card, CardBody, Container, DatePicker, DatePickerGroup, Grid, GridItem, Label, Stack } from "@stokei/ui";

import { useTranslations } from "@/hooks";
import { addMonths, convertToISODateString } from "@stokei/utils";
import { useMemo, useState } from "react";
import { Alerts } from "./components/alerts";
import { ChartAccessesFrequency } from "./components/charts/acesses-frequency";
import { ChartAccessesHours } from "./components/charts/acesses-hours";
import { ChartOrdersFrequency } from "./components/charts/orders-frequency";
import { ChartPaymentMethodsMostUsed } from "./components/charts/payment-methods-most-used";
import { Navbar } from "./components/navbar";
import { useGetMetricsQuery } from "./graphql/metrics.query.graphql.generated";
import { ProductsBestSeller } from "./components/products-best-seller";

export const DashboardPage = () => {
  const today = useMemo(() => new Date(Date.now()), []);
  const [startAt, setStartAt] = useState(() => addMonths(-1, Date.now()));
  const [endAt, setEndAt] = useState(() => today);

  const translate = useTranslations();

  const [{ data: dataGetMetrics }] = useGetMetricsQuery({
    pause: !startAt || !endAt,
    requestPolicy: 'network-only',
    variables: {
      startAt: convertToISODateString(startAt) || "",
      endAt: convertToISODateString(endAt) || "",
    }
  });
  const accessesFrequencyByPeriod = useMemo(() => dataGetMetrics?.accessesFrequencyByPeriod || [], [dataGetMetrics?.accessesFrequencyByPeriod]);
  const accessesHoursByPeriod = useMemo(() => dataGetMetrics?.accessesHoursByPeriod || [], [dataGetMetrics?.accessesHoursByPeriod]);
  const ordersFrequencyByPeriod = useMemo(() => dataGetMetrics?.ordersFrequencyByPeriod || [], [dataGetMetrics?.ordersFrequencyByPeriod]);
  const paymentMethodsMostUsedByPeriod = useMemo(() => dataGetMetrics?.paymentMethodsMostUsedByPeriod || [], [dataGetMetrics?.paymentMethodsMostUsedByPeriod]);
  const productsBestSellerByPeriod = useMemo(() => dataGetMetrics?.productsBestSellerByPeriod || [], [dataGetMetrics?.productsBestSellerByPeriod]);

  return (
    <AppLayout>
      <Navbar />
      <Container>
        <Stack direction="column" paddingY="5" spacing="5">
          <Alerts />
          <Card background="background.50">
            <CardBody>
              <Label>{translate.formatMessage({ id: 'period' })}</Label>
              <DatePickerGroup>
                <DatePicker
                  value={startAt}
                  onChange={setStartAt}
                  maxDate={today}
                />
                <DatePicker
                  value={endAt}
                  onChange={setEndAt}
                  maxDate={today}
                />
              </DatePickerGroup>
            </CardBody>
          </Card>

          <Grid
            templateRows={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)']}
            templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(3, 1fr)']}
            gap="5"
          >
            <GridItem colSpan={2}>
              <ChartOrdersFrequency
                data={ordersFrequencyByPeriod}
              />
            </GridItem>
            <GridItem>
              <ChartPaymentMethodsMostUsed
                data={paymentMethodsMostUsedByPeriod}
              />
            </GridItem>
          </Grid>

          <Stack direction={["column", "column", "row", "row"]} spacing="5">
            <ChartAccessesFrequency
              data={accessesFrequencyByPeriod}
            />
            <ChartAccessesHours
              data={accessesHoursByPeriod}
            />
          </Stack>

          <ProductsBestSeller data={productsBestSellerByPeriod} />
        </Stack>
      </Container>
    </AppLayout>
  );
};
