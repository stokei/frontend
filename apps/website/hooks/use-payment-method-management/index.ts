import { PaymentMethodComponentFragment } from "@/components/payment-method/graphql/payment-method.fragment.graphql.generated";
import { useCallback, useState } from "react";

export const usePaymentMethodManagement = () => {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodComponentFragment>();

  const onChangePaymentMethod = useCallback(
    (newPaymentMethod?: PaymentMethodComponentFragment) =>
      setPaymentMethod(newPaymentMethod),
    []
  );
  return {
    paymentMethod,
    onChangePaymentMethod,
  };
};
