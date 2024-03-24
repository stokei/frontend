import { Text } from "@stokei/ui";

import { AppCouponFragment } from "../graphql/coupons.query.graphql.generated";

interface CouponSelectItemContentProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponSelectItemContent = ({
  coupon,
}: CouponSelectItemContentProps) => {
  return <Text fontWeight="bold">{coupon?.code}</Text>;
};
