import { Price } from "@/components";
import { PriceComponentFragment } from "@/components/price/price.fragment.graphql.generated";
import { useTranslations } from "@/hooks";
import { BillingScheme } from "@/services/graphql/stokei";
import { getI18nKeyFromRecurringInterval } from "@/utils";
import { Stack, TableCell, TableRow, Text } from "@stokei/ui";
import { FC, memo, useMemo } from "react";
import { DeactivatePriceButton } from "../deactivate-price-button";
import { ActivatePriceButton } from "../activate-price-button";

interface PriceItemProps {
  price?: PriceComponentFragment;
  onSuccessPriceActivated: (price?: PriceComponentFragment) => void;
  onSuccessPriceDeactivated: (price?: PriceComponentFragment) => void;
}

export const PriceItem: FC<PriceItemProps> = memo(
  ({ price, onSuccessPriceActivated, onSuccessPriceDeactivated }) => {
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
        <TableCell display="flex" justifyContent="flex-end">
          {price?.active ? (
            <DeactivatePriceButton
              priceId={price?.id}
              onSuccess={onSuccessPriceDeactivated}
            />
          ) : (
            <ActivatePriceButton
              priceId={price?.id}
              onSuccess={onSuccessPriceActivated}
            />
          )}
        </TableCell>
      </TableRow>
    );
  }
);

PriceItem.displayName = "PriceItem";
