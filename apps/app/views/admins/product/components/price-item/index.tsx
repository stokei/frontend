import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { BillingScheme } from "@/services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "@/utils";
import { Stack, TableCell, TableRow, Text } from "@stokei/ui";
import { FC, memo, useMemo } from "react";

interface PriceItemProps {
  price?: PriceComponentFragment;
}

export const PriceItem: FC<PriceItemProps> = memo(({ price }) => {
  const translate = useTranslations();

  const priceAmount = useMemo(() => {
    return translate.formatMoney({
      amount: price?.amount || 0,
      currency: price?.currency?.id || "",
      minorUnit: price?.currency?.minorUnit,
    });
  }, [
    price?.amount,
    price?.currency?.id,
    price?.currency?.minorUnit,
    translate,
  ]);

  const fromPriceAmount = useMemo(() => {
    if (price?.fromAmount && price?.billingScheme === BillingScheme.PerUnit) {
      return translate.formatMoney({
        amount: price?.fromAmount,
        currency: price?.currency?.id,
        minorUnit: price?.currency?.minorUnit,
      });
    }
  }, [price, translate]);

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
    <TableRow key={price?.id}>
      <TableCell>{price?.nickname}</TableCell>
      <TableCell>
        <Stack width="full" direction="row" align="center">
          <Text fontSize="md" lineHeight="shorter" fontWeight="600">
            {price?.currency?.symbol}
          </Text>
          <Text
            fontSize="xl"
            color="primary.500"
            fontWeight="700"
            lineHeight="shorter"
          >
            {priceAmount}
          </Text>
        </Stack>
      </TableCell>
      <TableCell>
        {`${price?.recurring?.intervalCount} `}
        {translate
          .formatMessage({
            id: priceRecurringIntervalTypeKey as any,
          })
          ?.toLowerCase()}
      </TableCell>
    </TableRow>
  );
});

PriceItem.displayName = "PriceItem";
