import { IColorName } from "@stokei/ui";
import { StatusInvoiceFilter } from "../../components/select-filter-status";

export const getStatusColor = (status?: StatusInvoiceFilter) => {
  const colors: Record<StatusInvoiceFilter, IColorName> = {
    [StatusInvoiceFilter.All]: "teal",
    [StatusInvoiceFilter.Canceled]: "gray",
    [StatusInvoiceFilter.Paid]: "success",
    [StatusInvoiceFilter.PaymentError]: "error",
    [StatusInvoiceFilter.Pending]: "warning",
  };

  const defaultColor = colors[StatusInvoiceFilter.Pending];
  if (!status) {
    return defaultColor;
  }
  return colors[status] || defaultColor;
};
