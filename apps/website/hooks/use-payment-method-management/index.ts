import { PaymentMethodManagementPaymentMethodFragment } from "@/components/payment-method-management/graphql/payment-methods.query.graphql.generated";
import { useCallback, useState } from "react";

export const usePaymentMethodManagement = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodManagementPaymentMethodFragment>();

  const onChangePaymentMethod = useCallback(
    (newPaymentMethod?: PaymentMethodManagementPaymentMethodFragment) =>
      setPaymentMethod(newPaymentMethod),
    []
  );
  return {
    paymentMethod,
    onChangePaymentMethod,
  };
};
