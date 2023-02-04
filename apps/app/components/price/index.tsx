import { useTranslations } from "@/hooks";
import { BillingScheme } from "@/services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "@/utils";
import { Stack, StackProps, Text } from "@stokei/ui";
import { FC, useMemo } from "react";
import { PriceFragment } from "./price.fragment.graphql.generated";

export interface PriceProps extends StackProps {
  price: PriceFragment;
}
export const Price: FC<PriceProps> = ({ price, ...props }) => {
  const translate = useTranslations();

  const priceAmount = useMemo(() => {
    if (price?.amount && price.billingScheme === BillingScheme.PerUnit) {
      return translate.formatMoney({
        amount: price?.amount,
        currency: price?.currency?.id,
        minorUnit: price?.currency?.minorUnit,
      });
    }
    return price.tiers?.items?.[0]?.amount;
  }, [price]);

  const fromPriceAmount = useMemo(() => {
    if (price?.fromAmount && price.billingScheme === BillingScheme.PerUnit) {
      return translate.formatMoney({
        amount: price?.fromAmount,
        currency: price?.currency?.id,
        minorUnit: price?.currency?.minorUnit,
      });
    }
  }, [price]);

  const priceRecurringIntervalTypeKey = useMemo(() => {
    if (!price?.recurring?.interval) {
      return undefined;
    }
    const key = getI18nKeyFromRecurringInterval(price?.recurring?.interval);
    if (price?.recurring?.intervalCount > 1) {
      return key.plural;
    }
    return key.singular;
  }, [price]);

  return (
    <Stack width="full" direction="column" spacing="1" {...props}>
      {fromPriceAmount && (
        <Stack direction="row" align="center">
          <Text
            fontSize="md"
            color="text.300"
            fontWeight="600"
            textDecoration="line-through"
          >
            {price?.currency?.symbol} {fromPriceAmount}
          </Text>
        </Stack>
      )}

      <Stack width="full" direction="row" align="center">
        <Text fontSize="md" fontWeight="600">
          {price?.currency?.symbol}
        </Text>
        <Text
          fontSize="3xl"
          color="primary.500"
          fontWeight="900"
          lineHeight="shorter"
        >
          {priceAmount}
        </Text>
        {priceRecurringIntervalTypeKey && (
          <Text fontSize="lg" color="text.200">
            {price?.unit ? "/" + price?.unit : ""}/
            {translate
              .formatMessage({
                id: priceRecurringIntervalTypeKey as any,
              })
              ?.toLowerCase()}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
