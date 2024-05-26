import { useTranslations } from "@/hooks";
import { ChartData } from "@/services/graphql/stokei";
import {
  BarChart
} from "@stokei/ui";
import { useMemo } from "react";
import { Section } from "../section";

export const ChartAccessesHours = ({ data, isLoading }: { data: ChartData[]; isLoading: boolean }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({ ...item, label: item.label ? `${item.label}h` : "" }));
  }, [data]);

  return (
    <Section
      minHeight="80"
      maxHeight="300px"
      title={translate.formatMessage({ id: 'mostAccessedTimes' })}
      isEmpty={!data.length}
      isLoading={isLoading}
    >
      <BarChart
        data={currentData}
      />
    </Section>
  );
};
