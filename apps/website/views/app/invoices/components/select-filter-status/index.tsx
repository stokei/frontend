import { useTranslations } from "@/hooks";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  Select,
  SelectInput,
  SelectItem,
  SelectList,
} from "@stokei/ui";

import { StatusSelectItemContent } from "../status-select-item-content";

interface SelectFilterStatusProps {
  readonly currentStatus: InvoiceStatusFilter;
  readonly onChooseCurrentStatus: (value: InvoiceStatusFilter) => void;
  readonly onRemoveChooseCurrentStatus: (value: InvoiceStatusFilter) => void;
}

export const SelectFilterStatus = ({
  currentStatus,
  onChooseCurrentStatus,
  onRemoveChooseCurrentStatus,
}: SelectFilterStatusProps) => {
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
          <SelectItem value={InvoiceStatusFilter.All}>
            <StatusSelectItemContent
              status={InvoiceStatusFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={InvoiceStatusFilter.Paid}>
            <StatusSelectItemContent
              status={InvoiceStatusFilter.Paid}
              content={translate.formatMessage({ id: "paid" })}
            />
          </SelectItem>
          <SelectItem value={InvoiceStatusFilter.Pending}>
            <StatusSelectItemContent
              status={InvoiceStatusFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={InvoiceStatusFilter.Canceled}>
            <StatusSelectItemContent
              status={InvoiceStatusFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
          <SelectItem value={InvoiceStatusFilter.PaymentError}>
            <StatusSelectItemContent
              status={InvoiceStatusFilter.PaymentError}
              content={translate.formatMessage({ id: "paymentError" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
