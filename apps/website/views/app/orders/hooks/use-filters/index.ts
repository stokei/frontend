import { AppCouponFragment } from "@/components/select-coupons/graphql/coupons.query.graphql.generated";
import { AppAccountFragment } from "@/components/select-members/graphql/accounts.query.graphql.generated";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
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

  const onChooseCustomer = useCallback((customer?: AppAccountFragment) => {
    if (customer) {
      setCustomers((currentCustomers) => [...currentCustomers, customer]);
    }
  }, []);

  const onRemoveChooseCustomer = useCallback(
    (customerRemoved?: AppAccountFragment) => {
      if (customerRemoved) {
        setCustomers((currentCustomers) =>
          currentCustomers?.filter(
            (customer) => customer?.id !== customerRemoved?.id
          )
        );
      }
    },
    []
  );

  const onChooseCoupon = useCallback((customer?: AppCouponFragment) => {
    if (customer) {
      setCoupons((currentCoupons) => [...currentCoupons, customer]);
    }
  }, []);

  const onRemoveChooseCoupon = useCallback(
    (customerRemoved?: AppCouponFragment) => {
      if (customerRemoved) {
        setCoupons((currentCoupons) =>
          currentCoupons?.filter(
            (customer) => customer?.id !== customerRemoved?.id
          )
        );
      }
    },
    []
  );

  return {
    status,
    customers,
    coupons,
    setStatus,
    setCoupons,
    setCustomers,
    onClearFilters,
    onChooseCustomer,
    onRemoveChooseCustomer,
    onChooseCoupon,
    onRemoveChooseCoupon,
  };
};
