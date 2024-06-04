import { useTranslations } from "@/hooks";
import { InvoiceStatusFilter } from "@/interfaces/invoice-status-filter";
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
  readonly value: InvoiceStatusFilter;
  readonly onChange: (value: InvoiceStatusFilter) => void;
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
            <SingleSelectOption value={InvoiceStatusFilter.All}>
              <StatusSelectItemContent
                status={InvoiceStatusFilter.All}
                content={translate.formatMessage({ id: "all" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={InvoiceStatusFilter.Paid}>
              <StatusSelectItemContent
                status={InvoiceStatusFilter.Paid}
                content={translate.formatMessage({ id: "paid" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={InvoiceStatusFilter.Pending}>
              <StatusSelectItemContent
                status={InvoiceStatusFilter.Pending}
                content={translate.formatMessage({ id: "pending" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={InvoiceStatusFilter.Canceled}>
              <StatusSelectItemContent
                status={InvoiceStatusFilter.Canceled}
                content={translate.formatMessage({ id: "canceled" })}
              />
            </SingleSelectOption>
            <SingleSelectOption value={InvoiceStatusFilter.PaymentError}>
              <StatusSelectItemContent
                status={InvoiceStatusFilter.PaymentError}
                content={translate.formatMessage({ id: "paymentError" })}
              />
            </SingleSelectOption>
          </SingleSelectOptions>
        </SingleSelectCombobox>
      </SingleSelect>
    </FormControl>
  );
};
