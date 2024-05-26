import { useTranslations } from "@/hooks";
import { ChartData } from "@/services/graphql/stokei";
import {
  BarChart,
  Card,
  CardBody,
  Title
} from "@stokei/ui";
import { useMemo } from "react";
import { ChartEmptyState } from "../empty-state";

export const ChartAccessesHours = ({ data }: { data: ChartData[] }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({ ...item, label: item.label ? `${item.label}h` : "" }));
  }, [data]);

  return (
    <Card minHeight="80" maxHeight="300px" background="background.50">
      <CardBody>
        <Title fontSize="large">{translate.formatMessage({ id: 'mostAccessedTimes' })}</Title>
        {currentData?.length ? (
          <BarChart
            data={currentData}
          />
        ) : (
          <ChartEmptyState />
        )}
      </CardBody>
    </Card>
  );
};