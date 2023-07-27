import { useTranslations } from "@/hooks";
import { Card, CardBody, Stack, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { useGetAppBillingQuery } from "../../graphql/billing.query.graphql.generated";

export interface BillingListProps {}

export const BillingList: FC<BillingListProps> = () => {
  const translate = useTranslations();

  const [{ data: dataBilling, fetching: isLoadingBilling }] =
    useGetAppBillingQuery();

  const billing = useMemo(() => dataBilling?.billing, [dataBilling?.billing]);

  return (
    <Card background="background.50">
      <CardBody>
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
      </CardBody>
    </Card>
  );
};
