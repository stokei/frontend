import { AppCouponFragment } from "@/components/select-coupons/graphql/coupons.query.graphql.generated";
import { useCurrentApp, useTranslations } from "@/hooks";
import { Stack, Text } from "@stokei/ui";

interface CouponItemProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponItem = ({ coupon }: CouponItemProps) => {
  const translate = useTranslations();
  const { currentApp } = useCurrentApp();

  return (
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
  );
};
