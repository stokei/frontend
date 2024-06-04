import { useTranslations } from "@/hooks";
import { OrderStatusFilter } from "@/interfaces/order-status-filter";
import { convertEnumValueToCamelCase } from "@/utils";
import {
  FormControl,
  Label,
  SingleSelect,
  SingleSelectButton,
  SingleSelectCombobox,
  SingleSelectOption,
  SingleSelectOptions
} from "@stokei/ui";

import { StatusSelectItemContent } from "../status-select-item-content";

interface SelectFilterStatusProps {
  readonly value: OrderStatusFilter;
  readonly onChange: (value: OrderStatusFilter) => void;
}

export const SelectFilterStatus = ({
  value,
  onChange,
}: SelectFilterStatusProps) => {
  const translate = useTranslations();

  return (
    <FormControl flex="2">
      <Label>{translate.formatMessage({ id: "status" })}</Label>
      <SingleSelect
        id="status-invoice-filters-select-input"
        value={value}
        onChange={onChange}
      >
        <SingleSelectButton
          placeholder={translate.formatMessage({ id: "status" })}
          item={(status) => (
            <StatusSelectItemContent
              status={status}
              content={translate.formatMessage({
                id: convertEnumValueToCamelCase(status) || "all",
              })}
            />
          )}
        />
        <SingleSelectCombobox>
          <SingleSelectOptions>
            <SingleSelectOption value={OrderStatusFilter.All}>
              <StatusSelectItemContent
                status={OrderStatusFilter.All}
                content={translate.formatMessage({ id: "all" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={OrderStatusFilter.Paid}>
              <StatusSelectItemContent
                status={OrderStatusFilter.Paid}
                content={translate.formatMessage({ id: "paid" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={OrderStatusFilter.PartialPaid}>
              <StatusSelectItemContent
                status={OrderStatusFilter.PartialPaid}
                content={translate.formatMessage({ id: "partialPaid" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={OrderStatusFilter.Pending}>
              <StatusSelectItemContent
                status={OrderStatusFilter.Pending}
                content={translate.formatMessage({ id: "pending" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={OrderStatusFilter.PaymentError}>
              <StatusSelectItemContent
                status={OrderStatusFilter.PaymentError}
                content={translate.formatMessage({ id: "paymentError" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={OrderStatusFilter.Canceled}>
              <StatusSelectItemContent
                status={OrderStatusFilter.Canceled}
                content={translate.formatMessage({ id: "canceled" })}
              />
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
