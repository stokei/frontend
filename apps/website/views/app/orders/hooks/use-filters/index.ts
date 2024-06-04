import { AppCouponFragment } from "@/components/select-coupons/graphql/coupons.query.graphql.generated";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import { addOrRemoveItemFromArray } from "@stokei/utils";
import { useCallback, useState } from "react";

interface UseFiltersData {
  status?: OrderStatusFilter;
  coupons?: AppCouponFragment[];
  customers?: AppAccountFragment[];
}

export const useFilters = (data?: UseFiltersData) => {
  const [status, setStatus] = useState<OrderStatusFilter>(
    data?.status || OrderStatusFilter.All
  );
  const [customers, setCustomers] = useState<AppAccountFragment[]>(
    data?.customers || []
  );
  const [coupons, setCoupons] = useState<AppCouponFragment[]>(
    data?.coupons || []
  );

  const onClearFilters = useCallback(() => {
    setStatus(OrderStatusFilter.All);
    setCustomers([]);
    setCoupons([]);
  }, []);

  const onChangeCustomer = useCallback((customer?: AppAccountFragment) => {
    if (customer) {
      setCustomers((currentCustomers) =>
        addOrRemoveItemFromArray(currentCustomers, customer, "id")
      );
    }
  }, []);

  const onChangeCoupon = useCallback((coupon?: AppCouponFragment) => {
    if (coupon) {
      setCoupons((currentCoupons) =>
        addOrRemoveItemFromArray(currentCoupons, coupon, "id")
      );
    }
  }, []);

  return {
    status,
    customers,
    coupons,
    setStatus,
    setCoupons,
    setCustomers,
    onClearFilters,
    onChangeCustomer,
    onChangeCoupon,
  };
};
