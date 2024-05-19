import { AppLayout } from "@/views/app/layout";
import { Container, Stack } from "@stokei/ui";

import { addMonths, convertToISODateString } from "@stokei/utils";
import { useMemo } from "react";
import { Alerts } from "./components/alerts";
import { ChartAccessesFrequency } from "./components/charts/acesses-frequency";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { useGetMetricsQuery } from "./graphql/metrics.query.graphql.generated";
import { ChartAccessesHours } from "./components/charts/acesses-hours";

export const DashboardPage = () => {
  const startAt = useMemo(() => convertToISODateString(addMonths(-3, Date.now())) || "", []);
  const endAt = useMemo(() => convertToISODateString(Date.now()) || "", []);

  const [{ data: dataGetMetrics }] = useGetMetricsQuery({
    pause: !startAt || !endAt,
    variables: {
      startAt,
      endAt,
    }
  });
  const accessesFrequencyByPeriod = useMemo(() => dataGetMetrics?.accessesFrequencyByPeriod || [], [dataGetMetrics?.accessesFrequencyByPeriod]);
  const accessesHoursByPeriod = useMemo(() => dataGetMetrics?.accessesHoursByPeriod || [], [dataGetMetrics?.accessesHoursByPeriod]);

  return (
    <AppLayout>
      <Navbar />
      <Stack direction="column" paddingY="5" spacing="5">
        <Alerts />
        <Container>
          <Header />
        </Container>
        <Container>
          <Stack direction={["column", "column", "row", "row"]} spacing="5">
            <ChartAccessesFrequency
              data={accessesFrequencyByPeriod}
            />
            <ChartAccessesHours
              data={accessesHoursByPeriod}
            />
          </Stack>
        </Container>
      </Stack>
    </AppLayout>
  );
};
