import { useTranslations } from "../../hooks";
import { BillingScheme } from "../../services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "../../utils/get-i18n-key-from-recurring-interval";
import { Stack, StackProps, Text } from "@stokei/ui";
import { useMemo } from "react";
import { PriceComponentFragment } from "./price.fragment.graphql.generated";

export interface PriceProps extends StackProps {
  price?: PriceComponentFragment | null;
  size?: "md" | "lg";
  readonly withRecurringLabel?: boolean;
  readonly withPriceAndUnitDirectionColumn?: boolean;
  readonly withUnitDescription?: boolean;
}
export const Price: FC<PriceProps> = ({
  price,
  size,
  justify,
  withRecurringLabel = true,
  withUnitDescription,
  withPriceAndUnitDirectionColumn,
  ...props
}) => {
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
    if (!withRecurringLabel) {
      return;
    }
    if (!price?.recurring?.interval) {
      return undefined;
    }
    const key = getI18nKeyFromRecurringInterval(price?.recurring?.interval);
    if (price?.recurring?.intervalCount > 1) {
      return key.plural;
    }
    return key.singular;
  }, [
    price?.recurring?.interval,
    price?.recurring?.intervalCount,
    withRecurringLabel,
  ]);

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

  const unitFontSize = size === "lg" ? "lg" : "md";

  return (
    <Stack width="full" direction="column" spacing="1" {...props}>
      {fromPriceAmount && (
        <Stack direction="row" align="center" justify={justify}>
          <Text
            fontSize={size === "lg" ? "md" : "sm"}
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
            fontSize={size === "lg" ? "3xl" : "2xl"}
            color="primary.500"
            fontWeight="900"
            lineHeight="shorter"
          >
            {priceAmount}
          </Text>
        </Stack>
        {priceRecurringIntervalTypeKey && (
          <Stack direction="row" spacing="1">
            {unitDescription && (
              <>
                <Text fontSize={unitFontSize} color="text.200">
                  {eachUnitDescription}
                </Text>
                <Text fontSize={unitFontSize} color="text.200">
                  {unitDescription}
                </Text>
              </>
            )}
            <Text fontSize={unitFontSize} color="text.200">
              {perUnitDescription}
            </Text>
            {price?.recurring?.intervalCount &&
              price?.recurring?.intervalCount > 1 && (
                <Text fontSize={unitFontSize} color="text.200">
                  {price?.recurring?.intervalCount}
                </Text>
              )}
            <Text fontSize={unitFontSize} color="text.200">
              {translate
                .formatMessage({
                  id: priceRecurringIntervalTypeKey as any,
                })
                ?.toLowerCase()}
            </Text>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};
