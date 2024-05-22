import { useTranslations } from "@/hooks";
import { ChartData } from "@/services/graphql/stokei";
import {
  Card,
  CardBody,
  LineChart,
  Title
} from "@stokei/ui";
import { useMemo } from "react";

export const ChartAccessesFrequency = ({ data }: { data: ChartData[] }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({ ...item, label: translate.formatDate(item.label) || "" }));
  }, [data, translate]);

  return (
    <Card minHeight="80" maxHeight="300px" background="background.50">
      <CardBody>
        <Title fontSize="large">{translate.formatMessage({ id: 'accesses' })}</Title>
        <LineChart
          data={currentData}
        />
      </CardBody>
    </Card>
  );
};
