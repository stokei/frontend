import { useTranslations } from "@/hooks";
import { ChartData } from "@/services/graphql/stokei";
import {
  LineChart
} from "@stokei/ui";
import { useMemo } from "react";
import { Section } from "../section";

export const ChartOrdersFrequency = ({ data, isLoading }: { data: ChartData[]; isLoading: boolean }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({ ...item, label: translate.formatDate(item.label?.replace('00:00:00', '12:00:00')) || "" }));
  }, [data, translate]);

  return (
    <Section
      minHeight="80"
      maxHeight="300px"
      title={translate.formatMessage({ id: 'orders' })}
      isEmpty={!data.length}
      isLoading={isLoading}
    >
      <LineChart
        data={currentData}
      />
    </Section>
  );
};
