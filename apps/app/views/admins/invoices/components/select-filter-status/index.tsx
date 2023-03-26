import { useTranslations } from "@/hooks";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
} from "@stokei/ui";
import { FC } from "react";
import { StatusSelectItemContent } from "../status-select-item-content";

export enum StatusInvoiceFilter {
  All = "ALL",
  Canceled = "CANCELED",
  Paid = "PAID",
  PaymentError = "PAYMENT_ERROR",
  Pending = "PENDING",
}

interface SelectFilterStatusProps {
  readonly currentStatus: StatusInvoiceFilter;
  readonly onChooseCurrentStatus: (value: StatusInvoiceFilter) => void;
  readonly onRemoveChooseCurrentStatus: (value: StatusInvoiceFilter) => void;
}

export const SelectFilterStatus: FC<SelectFilterStatusProps> = ({
  currentStatus,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}) => {
  const translate = useTranslations();

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "status" })}</Label>
      <Select
        value={currentStatus}
        onChooseItem={onChooseCurrentStatus}
        onRemoveChooseItem={onRemoveChooseCurrentStatus}
      >
        <SelectInput
          id="status-invoice-filters-select-input"
          item={(status) => (
            <StatusSelectItemContent
              status={status}
              content={translate.formatMessage({
                id: convertEnumValueToCamelCase(status) || "all",
              })}
            />
          )}
        />
        <SelectList>
          <SelectItem value={StatusInvoiceFilter.All}>
            <StatusSelectItemContent
              status={StatusInvoiceFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={StatusInvoiceFilter.Paid}>
            <StatusSelectItemContent
              status={StatusInvoiceFilter.Paid}
              content={translate.formatMessage({ id: "paid" })}
            />
          </SelectItem>
          <SelectItem value={StatusInvoiceFilter.Pending}>
            <StatusSelectItemContent
              status={StatusInvoiceFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={StatusInvoiceFilter.Canceled}>
            <StatusSelectItemContent
              status={StatusInvoiceFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
          <SelectItem value={StatusInvoiceFilter.PaymentError}>
            <StatusSelectItemContent
              status={StatusInvoiceFilter.PaymentError}
              content={translate.formatMessage({ id: "paymentError" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
