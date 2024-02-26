import { SelectItem } from "@stokei/ui";
import { memo } from "react";
import { AppCouponFragment } from "../graphql/coupons.query.graphql.generated";
import { CouponSelectItemContent } from "../coupon-select-item-content";

interface CouponSelectItemProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponSelectItem = memo(({ coupon }: CouponSelectItemProps) => {
  return (
    <SelectItem value={coupon}>
      <CouponSelectItemContent coupon={coupon} />
    </SelectItem>
  );
});

CouponSelectItem.displayName = "CouponSelectItem";
