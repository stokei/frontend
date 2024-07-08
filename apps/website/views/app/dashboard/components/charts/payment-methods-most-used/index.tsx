import { useTranslations } from "@/hooks";
import { ChartData } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  DonutChart
} from "@stokei/ui";
import { useMemo } from "react";
import { Section } from "../section";

export const ChartPaymentMethodsMostUsed = ({ isLoading, data }: { data: ChartData[]; isLoading: boolean }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({
      ...item,
      label: translate.formatMessage({
        id: convertEnumValueToCamelCase(item.label)
      }) || ""
    }));
  }, [data, translate]);

  return (
    <Section
      minHeight="80"
      maxHeight="300px"
      title={translate.formatMessage({ id: 'paymentMethods' })}
      isEmpty={!data.length}
      isLoading={isLoading}
    >
      <DonutChart
        data={currentData}
      />
    </Section>
  );
};
