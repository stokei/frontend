import { Text } from "@stokei/ui";
import { FC } from "react";
import { AppCouponFragment } from "../graphql/coupons.query.graphql.generated";

interface CouponSelectItemContentProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponSelectItemContent: FC<CouponSelectItemContentProps> = ({
  coupon,
}) => {
  return <Text fontWeight="bold">{coupon?.code}</Text>;
};
