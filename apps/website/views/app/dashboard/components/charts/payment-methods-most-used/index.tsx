import { useTranslations } from "@/hooks";
import { ChartData, PaymentMethodType } from "@/services/graphql/stokei";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  Card,
  CardBody,
  DonutChart,
  Title
} from "@stokei/ui";
import { useMemo } from "react";
import { ChartEmptyState } from "../empty-state";

export const ChartPaymentMethodsMostUsed = ({ data }: { data: ChartData[] }) => {
  const translate = useTranslations();
  const currentData = useMemo(() => {
    return data?.map((item) => ({
      ...item,
      label: translate.formatMessage({
        id: item.label === PaymentMethodType.Stripe ?
          'internationalPayment' :
          convertEnumValueToCamelCase(item.label)
      }) || ""
    }));
  }, [data, translate]);

  return (
    <Card minHeight="80" maxHeight="300px" background="background.50">
      <CardBody>
        <Title fontSize="large">{translate.formatMessage({ id: 'mostUsedPaymentMethods' })}</Title>
        {currentData?.length ? (
          <DonutChart
            data={currentData}
          />
        ) : (
          <ChartEmptyState />
        )}
      </CardBody>
    </Card>
  );
};
