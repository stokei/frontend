import { useCurrentApp, useTranslations } from "@/hooks";
import { Stack, Text } from "@stokei/ui";
import { FC } from "react";
import { CheckoutPageCouponFragment } from "../../graphql/coupon.query.graphql.generated";
import { ChoiseRemovable } from "../choice-removable";

interface CouponItemProps {
  readonly coupon?: CheckoutPageCouponFragment;
  readonly onRemoveCoupon: () => void;
}

export const CouponItem: FC<CouponItemProps> = ({ coupon, onRemoveCoupon }) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
    <ChoiseRemovable onRemove={onRemoveCoupon}>
      <Stack direction="column" spacing="1">
        <Text fontWeight="semibold">{coupon?.code}</Text>
        {coupon?.amountOff && (
          <Text fontSize="sm">
            {translate.formatMoney({
              showSymbol: true,
              amount: coupon?.amountOff || 0,
              currency: currentApp?.currency?.id || "",
              minorUnit: currentApp?.currency?.minorUnit,
            })}{" "}
            OFF
          </Text>
        )}
        {coupon?.percentOff && (
          <Text fontSize="sm">{coupon?.percentOff}% OFF</Text>
        )}
      </Stack>
    </ChoiseRemovable>
  );
};
