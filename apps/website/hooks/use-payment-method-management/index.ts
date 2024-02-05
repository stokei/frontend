import { PaymentMethodManagementPaymentMethodCardFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { useCallback, useState } from "react";

export const usePaymentMethodManagement = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodManagementPaymentMethodCardFragment>();

  const onChangePaymentMethod = useCallback(
    (newPaymentMethod?: PaymentMethodManagementPaymentMethodCardFragment) =>
      setPaymentMethod(newPaymentMethod),
    []
  );
  return {
    paymentMethod,
    onChangePaymentMethod,
  };
};
