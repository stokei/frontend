import { useTranslations } from "@/hooks";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
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
  readonly status: OrderStatusFilter;
  readonly onChooseStatus: (value: OrderStatusFilter) => void;
  readonly onRemoveChooseStatus: (value: OrderStatusFilter) => void;
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
          <SelectItem value={OrderStatusFilter.All}>
            <StatusSelectItemContent
              status={OrderStatusFilter.All}
              content={translate.formatMessage({ id: "all" })}
            />
          </SelectItem>
          <SelectItem value={OrderStatusFilter.Paid}>
            <StatusSelectItemContent
              status={OrderStatusFilter.Paid}
              content={translate.formatMessage({ id: "paid" })}
            />
          </SelectItem>
          <SelectItem value={OrderStatusFilter.PartialPaid}>
            <StatusSelectItemContent
              status={OrderStatusFilter.PartialPaid}
              content={translate.formatMessage({ id: "partialPaid" })}
            />
          </SelectItem>
          <SelectItem value={OrderStatusFilter.Pending}>
            <StatusSelectItemContent
              status={OrderStatusFilter.Pending}
              content={translate.formatMessage({ id: "pending" })}
            />
          </SelectItem>
          <SelectItem value={OrderStatusFilter.PaymentError}>
            <StatusSelectItemContent
              status={OrderStatusFilter.PaymentError}
              content={translate.formatMessage({ id: "paymentError" })}
            />
          </SelectItem>
          <SelectItem value={OrderStatusFilter.Canceled}>
            <StatusSelectItemContent
              status={OrderStatusFilter.Canceled}
              content={translate.formatMessage({ id: "canceled" })}
            />
          </SelectItem>
        </SelectList>
      </Select>
    </FormControl>
  );
};
