import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
import { IColorName } from "@stokei/ui";

export const getInvoiceStatusColor = (status?: InvoiceStatusFilter) => {
  const colors: Record<InvoiceStatusFilter, IColorName> = {
    [InvoiceStatusFilter.All]: "teal",
    [InvoiceStatusFilter.Canceled]: "gray",
    [InvoiceStatusFilter.Paid]: "success",
    [InvoiceStatusFilter.PaymentError]: "error",
    [InvoiceStatusFilter.Pending]: "warning",
  };

  const defaultColor = colors[InvoiceStatusFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
