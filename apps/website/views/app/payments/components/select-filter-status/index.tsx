import { useTranslations } from "@/hooks";
import { PaymentStatusFilter } from "@/interfaces/payment-status-filter";
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
  readonly status: PaymentStatusFilter;
  readonly onChooseStatus: (value: PaymentStatusFilter) => void;
  readonly onRemoveChooseStatus: (value: PaymentStatusFilter) => void;
}

export const SelectFilterStatus = ({
  status,
  onChooseStatus,
  onRemoveChooseStatus,
}: SelectFilterStatusProps) => {
  const translate = useTranslations();

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "status" })}</Label>
      <Select
        value={status}
        onChooseItem={onChooseStatus}
        onRemoveChooseItem={onRemoveChooseStatus}
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
          <SelectItem value={PaymentStatusFilter.All}>
            <StatusSelectItemContent
              status={PaymentStatusFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={PaymentStatusFilter.Paid}>
            <StatusSelectItemContent
              status={PaymentStatusFilter.Paid}
              content={translate.formatMessage({ id: "paid" })}
            />
          </SelectItem>
          <SelectItem value={PaymentStatusFilter.Pending}>
            <StatusSelectItemContent
              status={PaymentStatusFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={PaymentStatusFilter.PaymentError}>
            <StatusSelectItemContent
              status={PaymentStatusFilter.PaymentError}
              content={translate.formatMessage({ id: "paymentError" })}
            />
          </SelectItem>
          <SelectItem value={PaymentStatusFilter.Canceled}>
            <StatusSelectItemContent
              status={PaymentStatusFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
