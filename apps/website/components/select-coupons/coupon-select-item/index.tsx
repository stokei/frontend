import { MultiSelectOption } from "@stokei/ui";

import { CouponSelectItemContent } from "../coupon-select-item-content";
import { AppCouponFragment } from "../graphql/coupons.query.graphql.generated";

interface CouponSelectItemProps {
  readonly coupon?: AppCouponFragment;
}

export const CouponSelectItem = ({ coupon }: CouponSelectItemProps) => {
  return (
    <MultiSelectOption value={coupon}>
      <CouponSelectItemContent coupon={coupon} />
    </MultiSelectOption>
  );
};
