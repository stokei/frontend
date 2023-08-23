import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import { IColorName } from "@stokei/ui";

export const getOrderStatusColor = (status?: OrderStatusFilter) => {
  const colors: Record<OrderStatusFilter, IColorName> = {
    [OrderStatusFilter.All]: "teal",
    [OrderStatusFilter.Canceled]: "gray",
    [OrderStatusFilter.Paid]: "success",
    [OrderStatusFilter.PartialPaid]: "green",
    [OrderStatusFilter.PaymentError]: "error",
    [OrderStatusFilter.Pending]: "warning",
  };

  const defaultColor = colors[OrderStatusFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
