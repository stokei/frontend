import { PaymentStatusFilter } from "@/interfaces/payment-status-filter";
import { IColorName } from "@stokei/ui";

export const getPaymentStatusColor = (status?: PaymentStatusFilter) => {
  const colors: Record<PaymentStatusFilter, IColorName> = {
    [PaymentStatusFilter.All]: "teal",
    [PaymentStatusFilter.Canceled]: "gray",
    [PaymentStatusFilter.Paid]: "success",
    [PaymentStatusFilter.PaymentError]: "error",
    [PaymentStatusFilter.Pending]: "warning",
  };

  const defaultColor = colors[PaymentStatusFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
