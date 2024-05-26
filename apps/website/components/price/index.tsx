import { useTranslations } from "@/hooks";
import { BillingScheme } from "@/services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "@/utils";
import { Stack, StackProps, Text } from "@stokei/ui";
import { useMemo } from "react";
import { PriceComponentFragment } from "./price.fragment.graphql.generated";

export interface PriceProps extends StackProps {
  price?: PriceComponentFragment | null;
  readonly withPriceAndUnitDirectionColumn?: boolean;
  readonly withUnitDescription?: boolean;
  readonly withRecurring?: boolean;
}
export const Price = ({
  price,
  justify,
  withRecurring = true,
  withUnitDescription,
  withPriceAndUnitDirectionColumn,
  ...props
}: PriceProps) => {
  const translate = useTranslations();

  const priceAmount = useMemo(() => {
    return translate.formatMoney({
      showSymbol: false,
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
    if (!price?.recurring?.interval || !withRecurring) {
      return undefined;
    }
    const key = getI18nKeyFromRecurringInterval(price?.recurring?.interval);
    if (price?.recurring?.intervalCount > 1) {
      return key.plural;
    }
    return key.singular;
  }, [price?.recurring, withRecurring]);

  const perUnitDescription = useMemo(
    () => (withUnitDescription ? translate.formatMessage({ id: "per" }) : "/"),
    [translate, withUnitDescription]
  );
  const eachUnitDescription = useMemo(
    () => (withUnitDescription ? translate.formatMessage({ id: "each" }) : "/"),
    [translate, withUnitDescription]
  );

  const unitDescription = useMemo(
    () =>
      price?.unit && withUnitDescription
        ? translate.formatMessage({ id: price?.unit?.toLowerCase() as any })
        : price?.unit,
    [price?.unit, translate, withUnitDescription]
  );
  const recurringText = useMemo(() => {
    const text: string[] = [];
    if (unitDescription) {
      text.push(`${eachUnitDescription} ${unitDescription}`)
    }
    text.push(perUnitDescription);
    if (price?.recurring?.intervalCount &&
      price?.recurring?.intervalCount > 1) {
      text.push(price?.recurring?.intervalCount + '');
    }
    text.push(
      translate
        .formatMessage({
          id: priceRecurringIntervalTypeKey as any,
        })
        ?.toLowerCase()
    );
    return text.join(' ');
  }, [
    eachUnitDescription,
    perUnitDescription,
    price?.recurring?.intervalCount,
    priceRecurringIntervalTypeKey,
    translate,
    unitDescription
  ]);

  return (
    <Stack width="full" direction="column" spacing="1" {...props}>
      {fromPriceAmount && (
        <Stack direction="row" align="center" justify={justify}>
          <Text
            fontSize="sm"
            color="text.300"
            fontWeight="600"
            textDecoration="line-through"
          >
            {price?.currency?.symbol} {fromPriceAmount}
          </Text>
        </Stack>
      )}

      <Stack
        width="full"
        direction={withPriceAndUnitDirectionColumn ? "column" : "row"}
        align="center"
        justify={justify}
      >
        <Stack
          width="fit-content"
          direction="row"
          align="center"
          justify="center"
        >
          <Text fontSize="md" fontWeight="600">
            {price?.currency?.symbol}
          </Text>
          <Text
            fontSize="xl"
            color="primary.500"
            fontWeight="900"
            lineHeight="shorter"
          >
            {priceAmount}
          </Text>
        </Stack>
        {priceRecurringIntervalTypeKey && (
          <Text fontSize="md" color="text.200">
            {recurringText}
          </Text>
        )}
      </Stack>
    </Stack>
  );
};
