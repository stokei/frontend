import { SelectItem } from "@stokei/ui";
import { FC, memo } from "react";
import { AppCouponFragment } from "../graphql/coupons.query.graphql.generated";
import { CouponSelectItemContent } from "../coupon-select-item-content";

interface CouponSelectItemProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponSelectItem: FC<CouponSelectItemProps> = memo(
  ({ coupon }) => {
    return (
      <SelectItem value={coupon}>
        <CouponSelectItemContent coupon={coupon} />
      </SelectItem>
    );
  }
);

CouponSelectItem.displayName = "CouponSelectItem";
